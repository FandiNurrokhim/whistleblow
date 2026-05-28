<?php

use App\Http\Controllers\Whistleblow\WhistleblowController;
use App\Http\Controllers\Whistleblow\WhistleblowQuotaController;
use Illuminate\Support\Facades\Route;

Route::prefix('whistleblow')->name('whistleblow.')->middleware(['auth'])->group(function () {
    Route::post('/bulk-delete',        [WhistleblowController::class, 'bulkDelete'])->name('bulk-delete');
    Route::get('/data',                [WhistleblowController::class, 'data'])->name('data');
    Route::get('/my-reports',          [WhistleblowController::class, 'myReports'])->name('my-reports');
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

Route::prefix('admin/whistleblow-quota')->name('admin.whistleblow-quota.')->middleware(['auth'])->group(function () {
    Route::get('/',               [WhistleblowQuotaController::class, 'index'])->name('index');
    Route::get('/data',           [WhistleblowQuotaController::class, 'data'])->name('data');
    Route::get('/{id}/edit',      [WhistleblowQuotaController::class, 'edit'])->name('edit');
    Route::put('/{id}',           [WhistleblowQuotaController::class, 'update'])->name('update');
    Route::post('/generate',      [WhistleblowQuotaController::class, 'generate'])->name('generate');
    Route::post('/reset',         [WhistleblowQuotaController::class, 'reset'])->name('reset');
});
