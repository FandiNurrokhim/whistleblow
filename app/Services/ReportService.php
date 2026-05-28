<?php

namespace App\Services;

use App\Models\Assessment;
use App\Models\User;
use App\Models\WhistleblowReport;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function getUserScoreSummary(string $period = null): array
    {
        $period = $period ?? now()->format('Y-m');

        $rows = Assessment::with('assessee:id,name,email,photo_profile')
            ->where('period', $period)
            ->where('status', 'completed')
            ->whereNotNull('final_score')
            ->select(
                'assessee_id',
                DB::raw('ROUND(AVG(final_score), 2) as avg_score'),
                DB::raw('COUNT(*) as total_assessments'),
                DB::raw('SUM(CASE WHEN type = "manager_to_staff" THEN 1 ELSE 0 END) as manager_assessment_count'),
                DB::raw('SUM(CASE WHEN type = "staff_to_staff" THEN 1 ELSE 0 END) as peer_assessment_count')
            )
            ->groupBy('assessee_id')
            ->orderByDesc('avg_score')
            ->get();

        $whistleblowData = WhistleblowReport::whereRaw("DATE_FORMAT(incident_date, '%Y-%m') = ?", [$period])
            ->select('reported_id', 'type', DB::raw('COUNT(*) as total'))
            ->groupBy('reported_id', 'type')
            ->get()
            ->groupBy('reported_id');

        return $rows->map(function ($row, $index) use ($whistleblowData) {
            $wb     = $whistleblowData->get($row->assessee_id, collect());
            $bata   = $wb->firstWhere('type', 'bata')?->total   ?? 0;
            $cendol = $wb->firstWhere('type', 'cendol')?->total ?? 0;

            return [
                'rank'                    => $index + 1,
                'user'                    => $row->assessee,
                'avg_score'               => $row->avg_score,
                'total_assessments'       => $row->total_assessments,
                'manager_assessment_count'=> $row->manager_assessment_count,
                'peer_assessment_count'   => $row->peer_assessment_count,
                'bata_received'           => $bata,
                'cendol_received'         => $cendol,
            ];
        })->toArray();
    }

    public function getAssessorActivity(string $period = null): array
    {
        $period = $period ?? now()->format('Y-m');

        return Assessment::with('assessor:id,name')
            ->where('period', $period)
            ->select(
                'assessor_id',
                DB::raw('COUNT(*) as total_given'),
                DB::raw('ROUND(AVG(final_score), 2) as avg_given_score')
            )
            ->groupBy('assessor_id')
            ->orderByDesc('total_given')
            ->get()
            ->map(fn($row) => [
                'user'             => $row->assessor,
                'total_given'      => $row->total_given,
                'avg_given_score'  => $row->avg_given_score,
            ])
            ->toArray();
    }

    public function getPeriodOptions(): array
    {
        $periods = Assessment::select('period')
            ->distinct()
            ->orderBy('period', 'desc')
            ->pluck('period')
            ->toArray();

        if (empty($periods)) {
            $periods = [now()->format('Y-m')];
        }

        return $periods;
    }

    public function getOverallStats(string $period = null): array
    {
        $period = $period ?? now()->format('Y-m');

        $assessmentStats = Assessment::where('period', $period)->select(
            DB::raw('COUNT(*) as total'),
            DB::raw('SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed'),
            DB::raw('SUM(CASE WHEN status = "draft" THEN 1 ELSE 0 END) as draft'),
            DB::raw('ROUND(AVG(CASE WHEN status = "completed" THEN final_score END), 2) as avg_score')
        )->first();

        $whistleblowStats = WhistleblowReport::whereRaw("DATE_FORMAT(incident_date, '%Y-%m') = ?", [$period])
            ->select('type', DB::raw('COUNT(*) as total'))
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();

        return [
            'total_assessments' => $assessmentStats->total       ?? 0,
            'completed'         => $assessmentStats->completed   ?? 0,
            'draft'             => $assessmentStats->draft       ?? 0,
            'avg_score'         => $assessmentStats->avg_score   ?? 0,
            'bata_total'        => $whistleblowStats['bata']   ?? 0,
            'cendol_total'      => $whistleblowStats['cendol'] ?? 0,
        ];
    }
}
