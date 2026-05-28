<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]
            ->forgetCachedPermissions();

        // ROLES
        $roles = [
            'Super Admin',
            'Manager',
            'Staff',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // PERMISSIONS
        $permissions = [
            'dashboard',
            'assessment',
            'assessment-criteria',
            'whistleblow',
            'report',
            'user',
            'role',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // SUPER ADMIN = semua permission
        Role::findByName('Super Admin')
            ->syncPermissions(Permission::all());

        // MANAGER = bisa menilai staff + lihat report + whistleblow
        Role::findByName('Manager')
            ->syncPermissions([
                'dashboard',
                'assessment',
                'whistleblow',
                'report',
            ]);

        // STAFF = bisa menilai sesama staff + whistleblow
        Role::findByName('Staff')
            ->syncPermissions([
                'dashboard',
                'assessment',
                'whistleblow',
            ]);
    }
}