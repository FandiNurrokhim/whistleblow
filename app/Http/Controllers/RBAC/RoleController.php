<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('admin/RBAC/Roles/Index');
    }

    public function data(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('pageIndex', 1);
        $sortBy = $request->input('sortBy', []);
        $search = $request->input('search');

        $query = Role::query()->with('permissions')->where('name', '!=', 'Super Admin');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }

        if (!empty($sortBy)) {
            foreach ($sortBy as $sort) {
                $query->orderBy($sort['id'], $sort['desc'] ? 'desc' : 'asc');
            }
        } else {
            $query->orderBy('updated_at', 'desc');
        }

        $roles = $query->paginate($perPage, ['*'], 'page', $page);

        // Format permissions as array of permission names or IDs
        $roles->getCollection()->transform(function ($role) {
            $role->permission = $role->permissions->pluck('name')->toArray();
            unset($role->permissions);
            return $role;
        });

        return response()->json($roles);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permission' => 'array',
            'permission.*' => 'exists:permissions,name',
        ]);

        DB::beginTransaction();
        try {
            $role = Role::create(['name' => $validated['name']]);
            if (!empty($validated['permission'])) {
                $role->syncPermissions($validated['permission']);
            }
            DB::commit();
            return back()->with('success', 'Role created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to create role: ' . $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        try {
            $role = Role::with('permissions')->findOrFail($id);
            $role->permission = $role->permissions->pluck('id')->toArray();
            unset($role->permissions);
            return response()->json(['data' => $role]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve role data.'], 404);
        }
    }

    public function update($id, Request $request)
    {
        $role = Role::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permission' => 'array',
            'permission.*' => 'exists:permissions,name',
        ]);

        DB::beginTransaction();
        try {
            $role->update(['name' => $validated['name']]);
            $role->syncPermissions($validated['permission'] ?? []);
            DB::commit();
            return redirect()->route('Admin.role.index')->with('success', 'Role updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to update role: ' . $e->getMessage()]);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $role = Role::findOrFail($id);

            // Cek apakah role digunakan oleh user
            if ($role->users()->count() > 0) {
                DB::rollBack();
                return response()->json([
                    'message' => [
                        'id' => 'Role sedang digunakan oleh pengguna dan tidak dapat dihapus.',
                        'en' => 'Role is assigned to user(s) and cannot be deleted.'
                    ]
                ], 400);
            }

            $role->delete();
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Role deleted successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to delete role: ' . $e->getMessage()], 500);
        }
    }
}
