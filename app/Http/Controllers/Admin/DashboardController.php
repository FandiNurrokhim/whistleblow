<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $service) {}

    public function index(Request $request)
    {
        $period = $request->input('period', now()->format('Y-m'));

        return Inertia::render('Admin/Dashboard/Index', [
            'topPerformers'      => $this->service->getTopPerformers($period),
            'averageScore'       => $this->service->getAverageScore($period),
            'whistleblowSummary' => $this->service->getWhistleblowSummary($period),
            'assessmentStats'    => $this->service->getAssessmentStats(),
            'trend'              => $this->service->getTrendByPeriod(),
            'currentPeriod'      => $period,
        ]);
    }

    public function getStudyPrograms()
    {
        return response()->json([]);
    }
}
