<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\CartItem;
use App\Models\SoldItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                    'price' => $cartItem->price,
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
                    'price' => $cartItem->price,
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

    public function checkout(Request $request, $userId)
    {
        $request->validate([
            'cartItems' => 'required|array',
        ]);

        try {
            DB::beginTransaction();
            $cartItems = $request->input('cartItems');

            foreach ($cartItems as $cartItem) {
                $itemId = $cartItem['item_id'];
                $quantity = $cartItem['quantity'];

                $item = Item::findOrFail($itemId);
                if ($item->quantity < $quantity) {
                    throw new \Exception("Insufficient quantity for item: {$item->name}");
                }

                SoldItem::create([
                    'user_id' => $userId,
                    'item_id' => $itemId,
                    'quantity' => $quantity,
                    'amount_paid' => $item->price * $quantity,
                ]);

                $item->quantity -= $quantity;
                $item->save();
            }

            DB::commit();

            return response()->json(['message' => 'Checkout successful'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to checkout: ' . $e->getMessage()], 500);
        }
    }

    public function deleteByUserId($userId)
    {
        try {
            $cartItems = CartItem::where('user_id', $userId)->get();
            foreach ($cartItems as $cartItem) {
                $cartItem->delete();
            }
            return response()->json(['message' => 'Cart items deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete cart items'], 500);
        }
    }

    public function update($id)
    {
        try {
            // Example: Update cart item logic (you can customize this based on your requirements)
            // Here, $id is the ID of the cart item you want to update

            // Placeholder code: Just return a success message
            return response()->json(['message' => 'Cart item updated successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions or errors
            return response()->json(['message' => 'Failed to update cart item'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Example: Delete cart item logic (you can customize this based on your requirements)
            // Here, $id is the ID of the cart item you want to delete

            // Placeholder code: Just return a success message
            return response()->json(['message' => 'Cart item deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions or errors
            return response()->json(['message' => 'Failed to delete cart item'], 500);
        }
    }
}
