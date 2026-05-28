<?php

namespace App\Http\Controllers\Assessment;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Services\AssessmentService;
use App\Services\AssessmentCriteriaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    const ADMIN_ROLES = ['Super Admin', 'Admin', 'HR'];

    public function __construct(
        protected AssessmentService $service,
        protected AssessmentCriteriaService $criteriaService,
    ) {}

    public function index()
    {
        $user    = auth()->user();
        $period  = now()->format('Y-m');
        $isAdmin = $user->hasAnyRole(self::ADMIN_ROLES);

        if ($isAdmin) {
            $stats = [
                'total'     => Assessment::withTrashed()->count(),
                'completed' => Assessment::where('status', 'completed')->count(),
                'draft'     => Assessment::where('status', 'draft')->count(),
            ];
            return Inertia::render('Assessment/Index', compact('stats'));
        }

        return Inertia::render('Assessment/StaffIndex', [
            'period'        => $period,
            'criteriaList'  => $this->criteriaService->getAll(),
            'targets'       => $this->service->getAssessmentTargets($user->id, $period),
            'myScores'      => $this->service->getMyScores($user->id, $period),
        ]);
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function targets(Request $request)
    {
        $period  = $request->input('period', now()->format('Y-m'));
        $targets = $this->service->getAssessmentTargets(auth()->id(), $period);
        return ApiResponse::success($targets, 'Success');
    }

    public function myScores(Request $request)
    {
        $period = $request->input('period', now()->format('Y-m'));
        $scores = $this->service->getMyScores(auth()->id(), $period);
        return ApiResponse::success($scores, 'Success');
    }

    public function create()
    {
        return Inertia::render('Assessment/Create', [
            'criteriaList' => $this->criteriaService->getAll(),
            'users'        => $this->service->getAvailableAssessees(auth()->id()),
        ]);
    }

    public function store(Request $request)
    {
        $user      = auth()->user();
        $isManager = $user->hasRole('Manager');

        $validated = $request->validate([
            'assessee_id'           => 'required|exists:users,id',
            'period'                => 'required|string|regex:/^\d{4}-\d{2}$/',
            'type'                  => 'required|in:manager_to_staff,staff_to_staff',
            'status'                => 'in:draft,submitted,completed',
            'notes'                 => 'nullable|string',
            'answers'               => 'nullable|array',
            'answers.*.criteria_id' => 'required|exists:assessment_criteria,id',
            'answers.*.score'       => 'required|integer|min:1|max:5',
            'answers.*.note'        => 'nullable|string',
        ]);

        $validated['assessor_id'] = $user->id;
        $validated['type']        = $isManager ? 'manager_to_staff' : 'staff_to_staff';
        $validated['status']      = 'completed';

        $this->service->store($validated);

        return back()->with('success', 'Penilaian berhasil disimpan.');
    }

    public function edit($id)
    {
        $assessment = Assessment::findOrFail($id);

        if (!auth()->user()->hasAnyRole(self::ADMIN_ROLES)) {
            abort_if($assessment->assessor_id !== auth()->id(), 403);
        }

        return ApiResponse::success(
            $this->service->getAssessmentWithAnswers($assessment),
            'Success'
        );
    }

    public function update(Request $request, $id)
    {
        $assessment = Assessment::findOrFail($id);

        if (!auth()->user()->hasAnyRole(self::ADMIN_ROLES)) {
            abort_if($assessment->assessor_id !== auth()->id(), 403);
        }

        $validated = $request->validate([
            'assessee_id'           => 'required|exists:users,id',
            'period'                => 'required|string|regex:/^\d{4}-\d{2}$/',
            'type'                  => 'required|in:manager_to_staff,staff_to_staff',
            'status'                => 'in:draft,submitted,completed',
            'notes'                 => 'nullable|string',
            'answers'               => 'nullable|array',
            'answers.*.criteria_id' => 'required|exists:assessment_criteria,id',
            'answers.*.score'       => 'required|integer|min:1|max:5',
            'answers.*.note'        => 'nullable|string',
        ]);

        $this->service->update($assessment, $validated);

        return back()->with('success', 'Penilaian berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $assessment = Assessment::findOrFail($id);

        if (!auth()->user()->hasAnyRole(self::ADMIN_ROLES)) {
            abort_if($assessment->assessor_id !== auth()->id(), 403);
        }

        $this->service->delete($assessment);
        return ApiResponse::success(null, 'Penilaian berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        abort_unless(auth()->user()->hasAnyRole(self::ADMIN_ROLES), 403);

        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkDelete($ids);
        return ApiResponse::success(null, 'Bulk delete berhasil.');
    }
}
