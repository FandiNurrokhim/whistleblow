<?php

use App\Http\Controllers\Assessment\AssessmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('assessment')->name('assessment.')->middleware(['auth'])->group(function () {
    Route::post('/bulk-delete', [AssessmentController::class, 'bulkDelete'])->name('bulk-delete');
    Route::get('/data',         [AssessmentController::class, 'data'])->name('data');
    Route::resource('/', AssessmentController::class)->parameters(['' => 'assessment'])->names([
        'index'   => 'index',
        'create'  => 'create',
        'store'   => 'store',
        'show'    => 'show',
        'edit'    => 'edit',
        'update'  => 'update',
        'destroy' => 'destroy',
    ]);
});
