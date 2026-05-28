<?php

namespace App\Services;

use App\Models\Assessment;
use App\Models\AssessmentCriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssessmentService
{
    public function getPaginatedData(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page    = $request->input('pageIndex', 1);
        $sortBy  = $request->input('sortBy', []);
        $search  = $request->input('search');
        $period  = $request->input('period');
        $type    = $request->input('type');
        $status  = $request->input('status');

        $query = Assessment::with(['assessor:id,name', 'assessee:id,name']);

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('assessor', fn($s) => $s->where('name', 'LIKE', "%{$search}%"))
                  ->orWhereHas('assessee', fn($s) => $s->where('name', 'LIKE', "%{$search}%"))
                  ->orWhere('period', 'LIKE', "%{$search}%");
            });
        }

        if (!empty($period)) {
            $query->where('period', $period);
        }

        if (!empty($type)) {
            $query->where('type', $type);
        }

        if (!empty($status)) {
            $query->where('status', $status);
        }

        if (!empty($sortBy)) {
            foreach ($sortBy as $sort) {
                $query->orderBy($sort['id'], $sort['desc'] ? 'desc' : 'asc');
            }
        } else {
            $query->orderBy('updated_at', 'desc');
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function store(array $data): Assessment
    {
        return DB::transaction(function () use ($data) {
            $answers = $data['answers'] ?? [];
            unset($data['answers']);

            $assessment = Assessment::create($data);

            if (!empty($answers)) {
                $assessment->answers()->createMany($answers);
                $assessment->update([
                    'final_score' => $this->calculateFinalScore($assessment->fresh(['answers.criteria'])),
                ]);
            }

            return $assessment->fresh(['assessor', 'assessee']);
        });
    }

    public function update(Assessment $assessment, array $data): Assessment
    {
        return DB::transaction(function () use ($assessment, $data) {
            $answers = $data['answers'] ?? [];
            unset($data['answers']);

            $assessment->update($data);

            if (!empty($answers)) {
                $assessment->answers()->delete();
                $assessment->answers()->createMany($answers);
                $assessment->update([
                    'final_score' => $this->calculateFinalScore($assessment->fresh(['answers.criteria'])),
                ]);
            }

            return $assessment->fresh(['assessor', 'assessee']);
        });
    }

    public function delete(Assessment $assessment): void
    {
        $assessment->delete();
    }

    public function bulkDelete(array $ids): void
    {
        Assessment::whereIn('id', $ids)->delete();
    }

    public function calculateFinalScore(Assessment $assessment): float
    {
        $answers      = $assessment->answers()->with('criteria')->get();
        $totalWeight  = 0;
        $weightedScore = 0;

        foreach ($answers as $answer) {
            $weight = $assessment->type === 'manager_to_staff'
                ? $answer->criteria->weight_manager
                : $answer->criteria->weight_staff;

            $weightedScore += $answer->score * $weight;
            $totalWeight   += $weight;
        }

        return $totalWeight > 0 ? round($weightedScore / $totalWeight, 2) : 0;
    }

    public function getAssessmentWithAnswers(Assessment $assessment): Assessment
    {
        return $assessment->load(['assessor:id,name', 'assessee:id,name', 'answers.criteria']);
    }

    public function getAvailableAssessees(int $assessorId): \Illuminate\Database\Eloquent\Collection
    {
        return \App\Models\User::where('id', '!=', $assessorId)
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();
    }

    public function getAssessmentTargets(int $assessorId, string $period): array
    {
        $assessedIds = Assessment::where('assessor_id', $assessorId)
            ->where('period', $period)
            ->pluck('id', 'assessee_id');

        $users = \App\Models\User::where('id', '!=', $assessorId)
            ->whereDoesntHave('roles', fn($q) => $q->where('name', 'Super Admin'))
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'photo_profile']);

        return $users->map(function ($user) use ($assessedIds, $assessorId, $period) {
            $assessmentId = $assessedIds->get($user->id);
            return [
                'user'          => $user,
                'assessed'      => $assessedIds->has($user->id),
                'assessment_id' => $assessmentId,
            ];
        })->toArray();
    }

    public function getMyScores(int $userId, string $period): array
    {
        $assessments = Assessment::with(['answers.criteria', 'assessor:id,name'])
            ->where('assessee_id', $userId)
            ->where('period', $period)
            ->where('status', 'completed')
            ->whereNotNull('final_score')
            ->get();

        if ($assessments->isEmpty()) {
            return [
                'avg_score'              => null,
                'total_assessments'      => 0,
                'manager_count'          => 0,
                'peer_count'             => 0,
                'by_criteria'            => [],
                'assessments'            => [],
            ];
        }

        $byCriteria = [];
        foreach ($assessments as $assessment) {
            foreach ($assessment->answers as $answer) {
                $name = $answer->criteria?->name ?? "Kriteria #{$answer->criteria_id}";
                if (!isset($byCriteria[$name])) {
                    $byCriteria[$name] = ['total' => 0, 'count' => 0];
                }
                $byCriteria[$name]['total'] += $answer->score;
                $byCriteria[$name]['count']++;
            }
        }

        $criteriaBreakdown = collect($byCriteria)->map(fn($v, $k) => [
            'name'  => $k,
            'score' => round($v['total'] / $v['count'], 2),
        ])->values()->toArray();

        return [
            'avg_score'         => round($assessments->avg('final_score'), 2),
            'total_assessments' => $assessments->count(),
            'manager_count'     => $assessments->where('type', 'manager_to_staff')->count(),
            'peer_count'        => $assessments->where('type', 'staff_to_staff')->count(),
            'by_criteria'       => $criteriaBreakdown,
            'assessments'       => $assessments->map(fn($a) => [
                'id'          => $a->id,
                'assessor'    => $a->assessor,
                'type'        => $a->type,
                'final_score' => $a->final_score,
            ])->toArray(),
        ];
    }
}
