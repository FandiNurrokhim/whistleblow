<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(protected UserService $service) {}

    public function index()
    {
        return Inertia::render('Admin/RBAC/User/Index', [
            'roles'     => $this->service->getRoles(),
            'userCount' => User::count(),
        ]);
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role'     => 'required|exists:roles,id',
            'phone'    => 'nullable|string|max:20',
            'address'  => 'nullable|string|max:255',
            'city'     => 'nullable|string|max:100',
            'state'    => 'nullable|string|max:100',
            'country'  => 'nullable|string|max:100',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png|max:512',
        ]);

        if ($request->hasFile('image')) {
            $validated['photo_profile'] = $this->uploadFile('photo_profile', $request->file('image'), $validated['name']);
        }

        $this->service->store($validated);

        return back()->with('success', 'Pengguna berhasil dibuat.');
    }

    public function show($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return response()->json(['user' => $user]);
    }

    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return ApiResponse::success($user, 'Success');
    }

    public function update(Request $request, $id)
    {
        $user      = User::findOrFail($id);
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'role'     => 'required|exists:roles,id',
            'phone'    => 'nullable|string|max:20',
            'address'  => 'nullable|string|max:255',
            'city'     => 'nullable|string|max:100',
            'state'    => 'nullable|string|max:100',
            'country'  => 'nullable|string|max:100',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png|max:512',
        ]);

        if ($request->hasFile('image')) {
            $validated['photo_profile'] = $this->updateFile('photo_profile', $request->file('image'), $user->photo_profile, $validated['name']);
        }

        $this->service->update($user, $validated);

        return back()->with('success', 'Pengguna berhasil diperbarui.');
    }

    public function destroy($id)
    {
        if (auth()->id() == $id) {
            return ApiResponse::error('Anda tidak dapat menghapus akun sendiri.', 403);
        }

        $this->service->delete(User::findOrFail($id));

        return ApiResponse::success(null, 'Pengguna berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array'])['ids'];

        if (in_array(auth()->id(), $ids)) {
            return ApiResponse::error('Anda tidak dapat menghapus akun sendiri.', 403);
        }

        $this->service->bulkDelete($ids);

        return ApiResponse::success(null, 'Pengguna berhasil dihapus.');
    }

    public function bulkApprove(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkApprove($ids);

        return ApiResponse::success(null, 'Pengguna berhasil di-approve.');
    }

    public function selectData()
    {
        return ApiResponse::success($this->service->selectData(), 'Success');
    }
}
