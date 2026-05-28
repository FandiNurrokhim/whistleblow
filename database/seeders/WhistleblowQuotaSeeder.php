<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WhistleblowQuota;
use Illuminate\Database\Seeder;

class WhistleblowQuotaSeeder extends Seeder
{
    /**
     * Kuota default per periode.
     * Ubah nilai ini untuk mengatur batas whistleblow.
     */
    const BATA_DEFAULT   = 3;
    const CENDOL_DEFAULT = 5;

    public function run(): void
    {
        $period = now()->format('Y-m');

        // Ambil semua user yang bukan Super Admin (Super Admin tidak perlu kuota)
        $users = User::role(['Manager', 'Staff'])->get();

        foreach ($users as $user) {
            WhistleblowQuota::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'period'  => $period,
                ],
                [
                    'bata_remaining'   => self::BATA_DEFAULT,
                    'cendol_remaining' => self::CENDOL_DEFAULT,
                ]
            );
        }

        $this->command->info("Whistleblow quota seeded for {$users->count()} users (period: {$period}).");
        $this->command->info("  Bata   : " . self::BATA_DEFAULT . "x per periode");
        $this->command->info("  Cendol : " . self::CENDOL_DEFAULT . "x per periode");
    }
}
