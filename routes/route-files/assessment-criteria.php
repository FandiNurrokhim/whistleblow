<?php

use App\Http\Controllers\Assessment\AssessmentCriteriaController;
use Illuminate\Support\Facades\Route;

Route::prefix('assessment-criteria')->name('assessment-criteria.')->middleware(['auth'])->group(function () {
    Route::post('/bulk-delete', [AssessmentCriteriaController::class, 'bulkDelete'])->name('bulk-delete');
    Route::get('/data',         [AssessmentCriteriaController::class, 'data'])->name('data');
    Route::get('/select-data',  [AssessmentCriteriaController::class, 'selectData'])->name('select-data');
    Route::resource('/', AssessmentCriteriaController::class)->parameters(['' => 'criteria'])->names([
        'index'   => 'index',
        'create'  => 'create',
        'store'   => 'store',
        'show'    => 'show',
        'edit'    => 'edit',
        'update'  => 'update',
        'destroy' => 'destroy',
    ]);
});
