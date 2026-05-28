<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class UserService
{
    public function getPaginatedData(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page    = $request->input('pageIndex', 1);
        $sortBy  = $request->input('sortBy', []);
        $search  = $request->input('search');

        $query = User::with(['roles:id,name'])
            ->whereDoesntHave('roles', fn($q) => $q->where('name', 'Super Admin'));

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
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

    public function store(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name'          => $data['name'],
                'email'         => $data['email'],
                'password'      => $data['password'],
                'phone'         => $data['phone']    ?? null,
                'address'       => $data['address']  ?? null,
                'city'          => $data['city']     ?? null,
                'state'         => $data['state']    ?? null,
                'country'       => $data['country']  ?? null,
                'photo_profile' => $data['photo_profile'] ?? null,
                'is_approved'   => true,
            ]);

            $user->assignRole(Role::findById($data['role']));

            if (!empty($data['permissions'])) {
                $user->syncPermissions($data['permissions']);
            }

            return $user->fresh(['roles']);
        });
    }

    public function update(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $user->update([
                'name'          => $data['name'],
                'email'         => $data['email'],
                'password'      => !empty($data['password']) ? $data['password'] : $user->password,
                'phone'         => $data['phone']   ?? $user->phone,
                'address'       => $data['address'] ?? $user->address,
                'city'          => $data['city']    ?? $user->city,
                'state'         => $data['state']   ?? $user->state,
                'country'       => $data['country'] ?? $user->country,
                'photo_profile' => $data['photo_profile'] ?? $user->photo_profile,
            ]);

            $user->syncRoles([Role::findById($data['role'])]);

            if (!empty($data['permissions'])) {
                $user->syncPermissions($data['permissions']);
            }

            return $user->fresh(['roles']);
        });
    }

    public function delete(User $user): void
    {
        $user->delete();
    }

    public function bulkDelete(array $ids): void
    {
        User::whereIn('id', $ids)->delete();
    }

    public function bulkApprove(array $ids): void
    {
        User::whereIn('id', $ids)->update([
            'is_approved' => true,
            'approved_at' => now(),
        ]);
    }

    public function selectData(): \Illuminate\Database\Eloquent\Collection
    {
        return User::whereDoesntHave('roles', fn($q) => $q->where('name', 'Super Admin'))
            ->where('id', '!=', auth()->id())
            ->orderBy('name')
            ->get(['id', 'name', 'email']);
    }

    public function getRoles(): \Illuminate\Database\Eloquent\Collection
    {
        return Role::where('name', '!=', 'Super Admin')
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}
