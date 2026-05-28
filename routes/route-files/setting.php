<?php

use App\Http\Controllers\Setting\SettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('Admin')->name('Admin.')->middleware('check.permission:setting')->group(function () {
    Route::resource('setting', SettingController::class)->names('setting');
});
