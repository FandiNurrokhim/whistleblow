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
}
