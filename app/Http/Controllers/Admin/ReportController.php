<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function __construct(protected ReportService $service) {}

    public function index(Request $request)
    {
        $period = $request->input('period', now()->format('Y-m'));

        return Inertia::render('Admin/Report/Index', [
            'period'          => $period,
            'periodOptions'   => $this->service->getPeriodOptions(),
            'overallStats'    => $this->service->getOverallStats($period),
            'userScores'      => $this->service->getUserScoreSummary($period),
            'assessorActivity'=> $this->service->getAssessorActivity($period),
        ]);
    }
}
