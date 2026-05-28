<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PreferenceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/api/user-preferences', [PreferenceController::class, 'getUserPreferences'])
    ->name('home.getUserPreferences');
Route::post('/api/user/preference', [PreferenceController::class, 'storeUserPreference'])
    ->name('home.storeUserPreference');
Route::post('/api/update-preference', [PreferenceController::class, 'updateUserPreference'])
    ->name('home.updateUserPreference');

Route::get('/product/{product}', [HomeController::class, 'show'])->name('product.detail');
Route::get('api/our-selection', [HomeController::class, 'ourSelection'])
    ->name('home.ourSelection');

Route::post('/review', [HomeController::class, 'storeReview'])
    ->name('review.storeReview');

Route::get('/api/categories', [HomeController::class, 'getCategories'])
    ->name('home.getCategories');
Route::get('/api/products', [HomeController::class, 'getProducts'])
    ->name('home.getProducts');

Route::get('/api/favorites', [FavoriteController::class, 'getFavorites'])
    ->name('home.getFavorite');
Route::post('/api/favorite', [FavoriteController::class, 'toggleFavorite'])
    ->name('home.toggleFavorite');

Route::get('/api/get-suggestion', [HomeController::class, 'getSuggestion'])
    ->name('home.getSuggestion');
Route::get('/api/search', [HomeController::class, 'search'])
    ->name('home.search');
Route::get('/api/filter-product', [HomeController::class, 'searchApi']);
Route::get('/favorites', [HomeController::class, 'getFavorites'])
    ->name('home.getFavorites');

Route::get('/api/partners', [HomeController::class, 'getPartners'])
    ->name('home.getPartners');
