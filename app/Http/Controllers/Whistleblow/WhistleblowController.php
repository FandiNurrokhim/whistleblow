<?php

namespace App\Http\Controllers\Whistleblow;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\WhistleblowReport;
use App\Services\WhistleblowService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhistleblowController extends Controller
{
    public function __construct(protected WhistleblowService $service) {}

    public function index()
    {
        $quota = $this->service->getQuota(auth()->id());

        return Inertia::render('Whistleblow/Index', [
            'quota' => $quota,
        ]);
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reported_id'   => 'required|exists:users,id',
            'type'          => 'required|in:bata,cendol',
            'reason'        => 'required|string|max:1000',
            'incident_date' => 'required|date|before_or_equal:today',
        ]);

        try {
            $this->service->submit($validated, auth()->id());
            return back()->with('success', 'Laporan berhasil dikirim.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $report = WhistleblowReport::with(['reporter:id,name', 'reported:id,name'])->findOrFail($id);
        return ApiResponse::success($report, 'Success');
    }

    public function updateStatus(Request $request, $id)
    {
        $report    = WhistleblowReport::findOrFail($id);
        $validated = $request->validate([
            'status'      => 'required|in:pending,reviewed,resolved',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $this->service->updateStatus($report, $validated['status'], $validated['admin_notes'] ?? null);

        return back()->with('success', 'Status laporan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $report = WhistleblowReport::findOrFail($id);
        $this->service->delete($report);

        return ApiResponse::success(null, 'Laporan berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkDelete($ids);

        return ApiResponse::success(null, 'Bulk delete berhasil.');
    }
}
