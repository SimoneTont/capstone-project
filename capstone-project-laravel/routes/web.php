<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/dashboard', function () {
    if (Auth::check()) {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }
    return response()->json([
        'message' => 'Unauthorized'
    ], 401);
});

require __DIR__.'/auth.php';
