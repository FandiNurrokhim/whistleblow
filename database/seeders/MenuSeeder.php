<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run()
    {
        // ── Dashboard ────────────────────────────────────────────
        Menu::create([
            'type'     => 'PARENT',
            'title_id' => 'Beranda',
            'title_en' => 'Dashboard',
            'icon'     => 'fa-solid fa-house',
            'route'    => 'admin.dashboard.index',
        ]);

        // ── Penilaian 360° ───────────────────────────────────────
        Menu::create([
            'type'     => 'HEADER',
            'title_id' => 'Penilaian 360°',
            'title_en' => 'Assessment',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'Assessment',
            'title_id' => 'Penilaian',
            'title_en' => 'Assessment',
            'icon'     => 'fa-solid fa-clipboard-list',
            'route'    => 'assessment.index',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'Assessment',
            'title_id' => 'Kriteria Penilaian',
            'title_en' => 'Assessment Criteria',
            'icon'     => 'fa-solid fa-sliders',
            'route'    => 'assessment-criteria.index',
        ]);

        // ── Whistleblow ──────────────────────────────────────────
        Menu::create([
            'type'     => 'HEADER',
            'title_id' => 'Whistleblow',
            'title_en' => 'Whistleblow',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'Whistleblow',
            'title_id' => 'Laporan Bata & Cendol',
            'title_en' => 'Bata & Cendol Reports',
            'icon'     => 'fa-solid fa-flag',
            'route'    => 'whistleblow.index',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'Whistleblow',
            'title_id' => 'Pengaturan Kuota',
            'title_en' => 'Quota Settings',
            'icon'     => 'fa-solid fa-gauge',
            'route'    => 'admin.whistleblow-quota.index',
        ]);

        // ── Laporan ──────────────────────────────────────────────
        Menu::create([
            'type'     => 'PARENT',
            'title_id' => 'Laporan',
            'title_en' => 'Reports',
            'icon'     => 'fa-solid fa-chart-bar',
            'route'    => 'report.index',
        ]);

        // ── Manajemen Pengguna ───────────────────────────────────
        Menu::create([
            'type'     => 'HEADER',
            'title_id' => 'Manajemen Pengguna',
            'title_en' => 'User Management',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'User Management',
            'title_id' => 'Pengguna',
            'title_en' => 'Users',
            'icon'     => 'fa-solid fa-users',
            'route'    => 'admin.user.index',
        ]);

        Menu::create([
            'type'     => 'PARENT',
            'header'   => 'User Management',
            'title_id' => 'Peran',
            'title_en' => 'Roles',
            'icon'     => 'fa-solid fa-user-shield',
            'route'    => 'admin.role.index',
        ]);
    }
}
