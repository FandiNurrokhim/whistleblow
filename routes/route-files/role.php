<?php

use App\Http\Controllers\RBAC\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware('check.permission:role')->group(function () {
    Route::get('role/data', [RoleController::class, 'data'])->name('stand.data');
    Route::resource('role', RoleController::class)->names('role');
});
