<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status'           => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = Auth::user();

        if (!$user->is_approved) {
            Auth::logout();
            return back()->withErrors([
                'email' => 'Akun Anda belum diaktifkan. Silakan hubungi administrator.',
            ]);
        }

        $request->session()->regenerate();

        // Staff langsung ke halaman assessment mereka
        if ($user->hasRole('Staff')) {
            return redirect()->route('assessment.index');
        }

        // Manager, Admin, HR, Super Admin ke dashboard
        return redirect()->route('admin.dashboard.index');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
