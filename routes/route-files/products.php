<?php

use App\Http\Controllers\MasterData\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('Admin')->name('Admin.')->middleware('check.permission:product')->group(function () {
    Route::get('product/data', [ProductController::class, 'data'])->name('product.data');
    Route::get('product/select-data', [ProductController::class, 'getSelectData'])->name('product.select-data');
    Route::post('recommendation/save', [ProductController::class, 'saveRecommendation'])->name('recommendation.save');
     Route::post('/bulk-delete', [ProductController::class, 'bulkDelete'])->name('product.bulk-delete');
    Route::resource('product', ProductController::class);
});
