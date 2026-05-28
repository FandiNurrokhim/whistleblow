<?php

namespace App\Services;

use App\Models\Assessment;
use App\Models\WhistleblowReport;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getTopPerformers(string $period = null, int $limit = 5): array
    {
        $period = $period ?? now()->format('Y-m');

        return Assessment::with('assessee:id,name')
            ->where('period', $period)
            ->where('status', 'completed')
            ->whereNotNull('final_score')
            ->select('assessee_id', DB::raw('AVG(final_score) as avg_score'), DB::raw('COUNT(*) as total_assessments'))
            ->groupBy('assessee_id')
            ->orderByDesc('avg_score')
            ->limit($limit)
            ->get()
            ->map(fn($item) => [
                'user'              => $item->assessee,
                'avg_score'         => round($item->avg_score, 2),
                'total_assessments' => $item->total_assessments,
            ])
            ->toArray();
    }

    public function getAverageScore(string $period = null): float
    {
        $period = $period ?? now()->format('Y-m');

        return round(
            Assessment::where('period', $period)
                ->where('status', 'completed')
                ->whereNotNull('final_score')
                ->avg('final_score') ?? 0,
            2
        );
    }

    public function getWhistleblowSummary(string $period = null): array
    {
        $period = $period ?? now()->format('Y-m');
        $year   = substr($period, 0, 4);
        $month  = substr($period, 5, 2);

        $summary = WhistleblowReport::whereYear('incident_date', $year)
            ->whereMonth('incident_date', $month)
            ->select('type', DB::raw('COUNT(*) as total'))
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();

        return [
            'bata'   => $summary['bata']   ?? 0,
            'cendol' => $summary['cendol'] ?? 0,
        ];
    }

    public function getAssessmentStats(): array
    {
        return [
            'total'     => Assessment::withTrashed()->count(),
            'completed' => Assessment::where('status', 'completed')->count(),
            'draft'     => Assessment::where('status', 'draft')->count(),
            'submitted' => Assessment::where('status', 'submitted')->count(),
        ];
    }

    public function getTrendByPeriod(int $months = 6): array
    {
        return Assessment::where('status', 'completed')
            ->whereNotNull('final_score')
            ->select('period', DB::raw('AVG(final_score) as avg_score'), DB::raw('COUNT(*) as total'))
            ->groupBy('period')
            ->orderBy('period', 'desc')
            ->limit($months)
            ->get()
            ->sortBy('period')
            ->values()
            ->toArray();
    }

    public function getWhistleblowSummaryByUser(int $userId): array
    {
        $received = WhistleblowReport::where('reported_id', $userId)
            ->select('type', DB::raw('COUNT(*) as total'))
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();

        $given = WhistleblowReport::where('reporter_id', $userId)
            ->select('type', DB::raw('COUNT(*) as total'))
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();

        return [
            'received_bata'   => $received['bata']   ?? 0,
            'received_cendol' => $received['cendol'] ?? 0,
            'given_bata'      => $given['bata']      ?? 0,
            'given_cendol'    => $given['cendol']    ?? 0,
        ];
    }
}
