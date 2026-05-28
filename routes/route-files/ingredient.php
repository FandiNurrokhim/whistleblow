<?php

use App\Http\Controllers\MasterData\IngredientController;
use Illuminate\Support\Facades\Route;

Route::prefix('Admin')->name('Admin.')->middleware('check.permission:ingredient')->group(function () {
    Route::post('ingredient/bulk-delete', [IngredientController::class, 'bulkDelete'])->name('ingredient.bulk-delete');
    Route::get('ingredient/data', [IngredientController::class, 'data'])->name('ingredient.data');
    Route::resource('ingredient', IngredientController::class);
});
