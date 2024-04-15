<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemsController extends Controller
{
    /**
     * Get all cart items.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $cartItems = CartItem::with('item')->get();
            $transformedCartItems = $cartItems->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'item_id' => $cartItem->item_id,
                    'user_id' => $cartItem->user_id,
                    'quantity' => $cartItem->quantity,
                    'name' => $cartItem->item->name,
                    'description' => $cartItem->item->description,
                    'image_path' => $cartItem->item->image_path,
                    'created_at' => $cartItem->created_at,
                    'updated_at' => $cartItem->updated_at,
                ];
            });
            return response()->json(['cartItems' => $transformedCartItems], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve cart items', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show all cart items associated with a specific user ID.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        try {
            $cartItems = CartItem::with('item')
                ->where('user_id', $userId)
                ->get();

            $transformedCartItems = $cartItems->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'item_id' => $cartItem->item_id,
                    'user_id' => $cartItem->user_id,
                    'quantity' => $cartItem->quantity,
                    'name' => $cartItem->item->name,
                    'description' => $cartItem->item->description,
                    'image_path' => $cartItem->item->image_path,
                    'created_at' => $cartItem->created_at,
                    'updated_at' => $cartItem->updated_at,
                ];
            });

            return response()->json(['cartItems' => $transformedCartItems], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve cart items', 'error' => $e->getMessage()], 500);
        }
    }
}
