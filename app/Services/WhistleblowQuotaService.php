<?php

namespace App\Services;

use App\Models\User;
use App\Models\WhistleblowQuota;
use Illuminate\Http\Request;

class WhistleblowQuotaService
{
    const BATA_DEFAULT   = 3;
    const CENDOL_DEFAULT = 5;

    public function getPaginatedData(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page    = $request->input('pageIndex', 1);
        $search  = $request->input('search');
        $period  = $request->input('period', now()->format('Y-m'));

        $query = WhistleblowQuota::with('user:id,name,email,photo_profile')
            ->where('period', $period);

        if (!empty($search)) {
            $query->whereHas('user', fn($q) =>
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
            );
        }

        return $query->orderByDesc('updated_at')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function update(WhistleblowQuota $quota, array $data): WhistleblowQuota
    {
        $quota->update([
            'bata_remaining'   => $data['bata_remaining'],
            'cendol_remaining' => $data['cendol_remaining'],
        ]);

        return $quota->fresh('user');
    }

    public function generateForPeriod(string $period): int
    {
        $users = User::whereDoesntHave('roles', fn($q) => $q->where('name', 'Super Admin'))
            ->get(['id']);

        $count = 0;
        foreach ($users as $user) {
            WhistleblowQuota::firstOrCreate(
                ['user_id' => $user->id, 'period' => $period],
                ['bata_remaining' => self::BATA_DEFAULT, 'cendol_remaining' => self::CENDOL_DEFAULT]
            );
            $count++;
        }

        return $count;
    }

    public function resetPeriod(string $period): int
    {
        return WhistleblowQuota::where('period', $period)->update([
            'bata_remaining'   => self::BATA_DEFAULT,
            'cendol_remaining' => self::CENDOL_DEFAULT,
        ]);
    }

    public function getPeriodOptions(): array
    {
        $periods = WhistleblowQuota::select('period')
            ->distinct()
            ->orderBy('period', 'desc')
            ->pluck('period')
            ->toArray();

        if (!in_array(now()->format('Y-m'), $periods)) {
            array_unshift($periods, now()->format('Y-m'));
        }

        return $periods;
    }
}
