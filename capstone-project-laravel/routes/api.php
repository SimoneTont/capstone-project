<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CartItemsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//Item routes
Route::get('/items', [ItemController::class, 'index']); //List
Route::get('/items/{id}', [ItemController::class, 'show']); //Details
Route::post('items/{id}/buy', [ItemController::class, 'buy']); //Buy

//Cart routes
Route::get('/cart-items', [CartItemsController::class, 'index']); //Cart items list
Route::get('/cart-items/{id}', [CartItemsController::class, 'show']); //Cart items of a given user

//Email routes
Route::post('/send-email', [ContactController::class, 'send']); //Contact

// Admin routes
Route::post('/add', [ItemController::class, 'store']); //Add
Route::put('/edit/{id}', [ItemController::class, 'update']); //Edit
Route::delete('/delete/{id}', [ItemController::class, 'destroy']); //Delete