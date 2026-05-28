<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MasterData\Lecturer\LecturerController;

Route::prefix('admin')->name('admin.')->middleware('check.permission:lecturer')->group(function () {
    Route::post('lecturer/bulk-delete', [LecturerController::class, 'bulkDelete'])->name('lecturer.bulk-delete');
    Route::get('lecturer/data', [LecturerController::class, 'data'])->name('lecturer.data');
    Route::get('lecturer/export', [LecturerController::class, 'export'])->name('lecturer.export');
    Route::get('lecturer/primary-supervisor/select-data', [LecturerController::class, 'primarySupervisor'])->name('lecturer.primary-supervisor.data');
    Route::get('lecturer/secondary-supervisor/select-data', [LecturerController::class, 'secondarySupervisor'])->name('lecturer.secondary-supervisor.data');
    Route::resource('lecturer', LecturerController::class);
});

// Public API
Route::get('/lecturer/primary-supervisor/select-data', [LecturerController::class, 'primarySupervisor'])->name('primary-supervisor.data');
Route::get('/lecturer/secondary-supervisor/select-data', [LecturerController::class, 'secondarySupervisor'])->name('secondary-supervisor.data');
