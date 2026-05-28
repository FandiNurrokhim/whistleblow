<?php

use App\Http\Controllers\MasterData\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware('check.permission:category')->group(function () {
    Route::post('/bulk-delete', [CategoryController::class, 'bulkDelete'])->name('category.bulk-delete');
    Route::get('category/data', [CategoryController::class, 'data'])->name('category.data');
    Route::resource('category', CategoryController::class)->names('category');
});
