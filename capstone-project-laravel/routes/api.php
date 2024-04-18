<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CartItemsController;
use App\Http\Controllers\SoldItemsController;
use App\Models\SoldItem;

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
Route::post('items/{id}/cart', [ItemController::class, 'cart']); //Send to cart
 
//Cart routes
Route::get('/cart-items', [CartItemsController::class, 'index']); //Cart items list
Route::get('/cart-items/{id}', [CartItemsController::class, 'show']); //Cart items of a given user
Route::post('/cart-items/{id}/checkout', [CartItemsController::class, 'checkout']); //Checkout
Route::put('/cart-items/{id}', [CartItemsController::class, 'update']); //Update
Route::delete('/cart-items/{id}', [CartItemsController::class, 'destroy']); //Delete
Route::delete('/cart-items/{id}', [CartItemsController::class, 'deleteByUserId']); //Empty cart

//Email routes
Route::post('/send-email', [ContactController::class, 'send']); //Contact

// Admin routes
Route::post('/add', [ItemController::class, 'store']); //Add an item
Route::put('/edit/{id}', [ItemController::class, 'update']); //Edit an item
Route::delete('/delete/{id}', [ItemController::class, 'destroy']); //Delete an item

//Orders
Route::get('/orders/{id}', [SoldItemsController::class, 'index']); //List of orders of a given user