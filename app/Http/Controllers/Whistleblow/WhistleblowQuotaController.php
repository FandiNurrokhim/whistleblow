<?php

namespace App\Http\Controllers\Whistleblow;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\WhistleblowQuota;
use App\Services\WhistleblowQuotaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhistleblowQuotaController extends Controller
{
    public function __construct(protected WhistleblowQuotaService $service) {}

    public function index()
    {
        return Inertia::render('Admin/WhistleblowQuota/Index', [
            'periodOptions'  => $this->service->getPeriodOptions(),
            'bataDefault'    => WhistleblowQuotaService::BATA_DEFAULT,
            'cendolDefault'  => WhistleblowQuotaService::CENDOL_DEFAULT,
        ]);
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function edit($id)
    {
        $quota = WhistleblowQuota::with('user:id,name,email')->findOrFail($id);
        return ApiResponse::success($quota, 'Success');
    }

    public function update(Request $request, $id)
    {
        $quota     = WhistleblowQuota::findOrFail($id);
        $validated = $request->validate([
            'bata_remaining'   => 'required|integer|min:0|max:100',
            'cendol_remaining' => 'required|integer|min:0|max:100',
        ]);

        $this->service->update($quota, $validated);

        return back()->with('success', 'Kuota berhasil diperbarui.');
    }

    public function generate(Request $request)
    {
        $period = $request->validate(['period' => 'required|string|regex:/^\d{4}-\d{2}$/'])['period'];
        $count  = $this->service->generateForPeriod($period);

        return ApiResponse::success(['count' => $count], "Kuota berhasil digenerate untuk {$count} pengguna.");
    }

    public function reset(Request $request)
    {
        $period = $request->validate(['period' => 'required|string|regex:/^\d{4}-\d{2}$/'])['period'];
        $count  = $this->service->resetPeriod($period);

        return ApiResponse::success(['count' => $count], "Kuota berhasil direset untuk {$count} pengguna.");
    }
}
