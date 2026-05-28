<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuidanceStudent\GuidanceStudentController;

Route::prefix('admin/guidance-student')->name('admin.guidance-student.')->middleware('check.permission:dashboard')->group(function () {
    Route::get('/', [GuidanceStudentController::class, 'index'])->name('index');
    Route::get('/data', [GuidanceStudentController::class, 'data'])->name('data');
});