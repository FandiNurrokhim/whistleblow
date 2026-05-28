<?php

namespace App\Http\Controllers\Assessment;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\AssessmentCriteria;
use App\Services\AssessmentCriteriaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentCriteriaController extends Controller
{
    public function __construct(protected AssessmentCriteriaService $service) {}

    public function index()
    {
        return Inertia::render('Admin/AssessmentCriteria/Index'); // stays admin since it's master data management
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function selectData()
    {
        return ApiResponse::success($this->service->getAll(), 'Success');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'weight_manager' => 'required|numeric|min:0|max:100',
            'weight_staff'   => 'required|numeric|min:0|max:100',
            'is_active'      => 'boolean',
        ]);

        $this->service->store($validated);

        return back()->with('success', 'Kriteria penilaian berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $criteria = AssessmentCriteria::findOrFail($id);
        return ApiResponse::success($criteria, 'Success');
    }

    public function update(Request $request, $id)
    {
        $criteria  = AssessmentCriteria::findOrFail($id);
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'weight_manager' => 'required|numeric|min:0|max:100',
            'weight_staff'   => 'required|numeric|min:0|max:100',
            'is_active'      => 'boolean',
        ]);

        $this->service->update($criteria, $validated);

        return back()->with('success', 'Kriteria penilaian berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $criteria = AssessmentCriteria::findOrFail($id);
        $this->service->delete($criteria);

        return ApiResponse::success(null, 'Kriteria penilaian berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkDelete($ids);

        return ApiResponse::success(null, 'Bulk delete berhasil.');
    }
}
