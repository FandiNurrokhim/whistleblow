<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        // Super Admin
        $super = User::factory()->create([
            'name'        => 'Super Admin',
            'email'       => 'superadmin@gmail.com',
            'password'    => bcrypt('password'),
            'is_approved' => true,
        ]);
        $super->assignRole('Super Admin');

        // Manager
        $manager = User::factory()->create([
            'name'        => 'Manager',
            'email'       => 'manager@gmail.com',
            'password'    => bcrypt('password'),
            'is_approved' => true,
        ]);
        $manager->assignRole('Manager');

        // Staff sample (3 orang)
        $staffData = [
            ['name' => 'Staff Satu',  'email' => 'staff1@gmail.com'],
            ['name' => 'Staff Dua',   'email' => 'staff2@gmail.com'],
            ['name' => 'Staff Tiga',  'email' => 'staff3@gmail.com'],
        ];

        foreach ($staffData as $data) {
            $staff = User::factory()->create([
                'name'        => $data['name'],
                'email'       => $data['email'],
                'password'    => bcrypt('password'),
                'is_approved' => true,
            ]);
            $staff->assignRole('Staff');
        }

        $this->call(MenuSeeder::class);
        $this->call(WhistleblowQuotaSeeder::class);
        $this->call(AssessmentCriteriaSeeder::class);
        $this->call(AssessmentSeeder::class);
    }
}
