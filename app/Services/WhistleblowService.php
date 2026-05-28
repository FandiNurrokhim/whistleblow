<?php

namespace App\Services;

use App\Models\WhistleblowQuota;
use App\Models\WhistleblowReport;
use Illuminate\Http\Request;

class WhistleblowService
{
    public function getPaginatedData(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page    = $request->input('pageIndex', 1);
        $sortBy  = $request->input('sortBy', []);
        $search  = $request->input('search');
        $type    = $request->input('type');
        $status  = $request->input('status');

        $query = WhistleblowReport::with(['reporter:id,name', 'reported:id,name']);

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('reporter', fn($s) => $s->where('name', 'LIKE', "%{$search}%"))
                  ->orWhereHas('reported', fn($s) => $s->where('name', 'LIKE', "%{$search}%"))
                  ->orWhere('reason', 'LIKE', "%{$search}%");
            });
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

    public function submit(array $data, int $reporterId): WhistleblowReport
    {
        if ($data['reported_id'] == $reporterId) {
            throw new \Exception('Anda tidak dapat melaporkan diri sendiri.');
        }

        $quota = WhistleblowQuota::firstOrCreate(
            ['user_id' => $reporterId, 'period' => now()->format('Y-m')],
            ['bata_remaining' => 3, 'cendol_remaining' => 5]
        );

        if ($data['type'] === 'bata' && $quota->bata_remaining <= 0) {
            throw new \Exception('Kuota bata Anda sudah habis untuk periode ini.');
        }

        if ($data['type'] === 'cendol' && $quota->cendol_remaining <= 0) {
            throw new \Exception('Kuota cendol Anda sudah habis untuk periode ini.');
        }

        $report = WhistleblowReport::create(array_merge($data, ['reporter_id' => $reporterId]));

        if ($data['type'] === 'bata') {
            $quota->decrement('bata_remaining');
        } else {
            $quota->decrement('cendol_remaining');
        }

        return $report->fresh(['reporter', 'reported']);
    }

    public function updateStatus(WhistleblowReport $report, string $status, ?string $adminNotes = null): WhistleblowReport
    {
        $report->update(['status' => $status, 'admin_notes' => $adminNotes]);
        return $report->fresh(['reporter', 'reported']);
    }

    public function delete(WhistleblowReport $report): void
    {
        $report->delete();
    }

    public function bulkDelete(array $ids): void
    {
        WhistleblowReport::whereIn('id', $ids)->delete();
    }

    public function getQuota(int $userId): WhistleblowQuota
    {
        return WhistleblowQuota::firstOrCreate(
            ['user_id' => $userId, 'period' => now()->format('Y-m')],
            ['bata_remaining' => 3, 'cendol_remaining' => 5]
        );
    }
}
