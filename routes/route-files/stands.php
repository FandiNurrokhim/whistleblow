<?php

use App\Http\Controllers\MasterData\StandController;
use Illuminate\Support\Facades\Route;

Route::prefix('Admin')->name('Admin.')->middleware('check.permission:stand')->group(function () {
    Route::post('/stand/bulk-delete', [StandController::class, 'bulkDelete'])->name('stand.bulk-delete');
    Route::get('stand/data', [StandController::class, 'data'])->name('stand.data');
    Route::resource('stand', StandController::class)->names('stand');
});
