<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('admin.dashboard.index');
    }
    return redirect()->route('login');
});


Route::get('/cek-locale', function () {
    return response()->json([
        'locale' => app()->getLocale(),
        'message' => __('validation.required', ['attribute' => 'email']),
    ]);
});

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

Route::get('/auth/google', [GoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleController::class, 'callback']);

require __DIR__ . '/route-files/api-home.php';

Route::middleware('auth')->group(function () {
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    require __DIR__ . '/route-files/dashboard.php';
    require __DIR__ . '/route-files/user.php';
    require __DIR__ . '/route-files/role.php';
    require __DIR__ . '/route-files/assessment-criteria.php';
    require __DIR__ . '/route-files/assessment.php';
    require __DIR__ . '/route-files/whistleblow.php';
    require __DIR__ . '/route-files/report.php';
});

// Route::get('/categories', [CategoryController::class, 'getCategories']);
// Route::get('/get-food-by-category', [CategoryController::class, 'getFoodByCategory']);

require __DIR__ . '/auth.php';
