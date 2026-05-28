<?php

namespace App\Http\Controllers\Whistleblow;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\WhistleblowReport;
use App\Services\WhistleblowService;
use App\Services\AssessmentCriteriaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhistleblowController extends Controller
{
    const ADMIN_ROLES = ['Super Admin', 'Admin', 'HR'];

    public function __construct(protected WhistleblowService $service) {}

    public function index()
    {
        $user    = auth()->user();
        $quota   = $this->service->getQuota($user->id);
        $isAdmin = $user->hasAnyRole(self::ADMIN_ROLES);

        if ($isAdmin) {
            return Inertia::render('Whistleblow/Index', [
                'quota'   => $quota,
                'isAdmin' => true,
            ]);
        }

        $users = \App\Models\User::where('id', '!=', $user->id)
            ->whereDoesntHave('roles', fn($q) => $q->where('name', 'Super Admin'))
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'photo_profile']);

        return Inertia::render('Whistleblow/StaffIndex', [
            'quota'   => $quota,
            'users'   => $users,
            'isAdmin' => false,
        ]);
    }

    public function data(Request $request)
    {
        $user = auth()->user();

        if (!$user->hasAnyRole(self::ADMIN_ROLES)) {
            return response()->json(
                $this->service->getMyReports($user->id, $request)
            );
        }

        return response()->json($this->service->getPaginatedData($request));
    }

    public function myReports(Request $request)
    {
        return response()->json(
            $this->service->getMyReports(auth()->id(), $request)
        );
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
        abort_unless(auth()->user()->hasAnyRole(self::ADMIN_ROLES), 403);

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

        abort_unless(
            auth()->user()->hasAnyRole(self::ADMIN_ROLES) || $report->reporter_id === auth()->id(),
            403
        );

        $this->service->delete($report);
        return ApiResponse::success(null, 'Laporan berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        abort_unless(auth()->user()->hasAnyRole(self::ADMIN_ROLES), 403);

        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkDelete($ids);
        return ApiResponse::success(null, 'Bulk delete berhasil.');
    }
}
