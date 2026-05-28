<?php

use App\Http\Controllers\Whistleblow\WhistleblowController;
use Illuminate\Support\Facades\Route;

Route::prefix('whistleblow')->name('whistleblow.')->middleware(['auth'])->group(function () {
    Route::post('/bulk-delete',        [WhistleblowController::class, 'bulkDelete'])->name('bulk-delete');
    Route::get('/data',                [WhistleblowController::class, 'data'])->name('data');
    Route::put('/{id}/update-status',  [WhistleblowController::class, 'updateStatus'])->name('update-status');
    Route::resource('/', WhistleblowController::class)->parameters(['' => 'whistleblow'])->except(['update'])->names([
        'index'   => 'index',
        'create'  => 'create',
        'store'   => 'store',
        'show'    => 'show',
        'edit'    => 'edit',
        'destroy' => 'destroy',
    ]);
});
