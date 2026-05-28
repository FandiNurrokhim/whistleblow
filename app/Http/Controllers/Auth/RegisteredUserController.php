<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nim' => 'required|unique:students,nim',
            'name' => 'required|string|max:255',
            'study_program_id' => 'required|exists:study_programs,id',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        DB::beginTransaction();

        try {

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'is_approved' => false,
            ]);

            $student = Student::create([
                'user_id' => $user->id,
                'study_program_id' => $validated['study_program_id'],
                'nim' => $validated['nim'],
                'name' => $validated['name'],
            ]);

            $user->assignRole('Mahasiswa');

            DB::commit();

            event(new Registered($user));

            return redirect()
                ->route('login')
                ->with(
                    'status',
                    'Akun ' . $user->email .
                        ' dengan NIM ' . $student->nim .
                        ' berhasil dibuat. Silakan hubungi admin kampus untuk aktivasi.'
                );
        } catch (\Exception $e) {

            DB::rollBack();

            report($e);

            return back()
                ->withInput()
                ->withErrors([
                    'system' => 'Terjadi kesalahan saat registrasi. ' . $e->getMessage()
                ]);
        }
    }
}
