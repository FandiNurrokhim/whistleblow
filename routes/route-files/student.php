<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Thesis\ThesisSubmissionController;
use App\Http\Controllers\MasterData\Student\StudentController;

Route::prefix('admin')->name('admin.')->middleware('check.permission:student')->group(function () {
    Route::post('student/bulk-delete', [StudentController::class, 'bulkDelete'])->name('student.bulk-delete');
    Route::get('student/data', [StudentController::class, 'data'])->name('student.data');
    Route::get('student/export', [StudentController::class, 'export'])->name('student.export');
    Route::resource('student', StudentController::class);
});
// Public api
Route::get('/student/{student}/supervisor-lock', [StudentController::class, 'supervisorLock'])->name('student.supervisor-lock');
Route::post('/student/thesis-submission/{student}', [StudentController::class, 'thesisSubmission'])->name('student.thesis-submission');
Route::get(
    '/admin/thesis-submission/{submission}/print',
    [ThesisSubmissionController::class, 'printApproval']
)->name('thesis-submission.print');
