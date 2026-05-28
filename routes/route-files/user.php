    <?php

     use Illuminate\Support\Facades\Route;
     use App\Http\Controllers\UserController;

     Route::prefix('admin')->name('admin.')->group(function () {
          Route::get('/user/select-data', [UserController::class, 'selectData'])->name('user.select-data')->middleware('auth');
          Route::middleware('check.permission:user')->group(function () {
               Route::post('/user/bulk-approve', [UserController::class, 'bulkApprove'])->name('user.bulk-approve');
               Route::post('/user/bulk-delete', [UserController::class, 'bulkDelete'])->name('user.bulk-delete');
               Route::get('/user/data', [UserController::class, 'data'])->name('user.data');
               Route::resource('user', UserController::class)->names('user');
          });
     });
