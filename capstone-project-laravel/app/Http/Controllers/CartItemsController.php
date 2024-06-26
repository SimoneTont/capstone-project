<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\CartItem;
use App\Models\SoldItem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

    public function update($id, Request $request)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            $validatedData = $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $oldQuantity = $cartItem->quantity;
            $newQuantity = $validatedData['quantity'];

            $quantityDifference = $newQuantity - $oldQuantity;

            $cartItem->update(['quantity' => $newQuantity]);

            if ($quantityDifference != 0) {
                $item = Item::findOrFail($cartItem->item_id);

                $item->decrement('quantity', $quantityDifference);
            }

            $unitPrice = $cartItem->price / $oldQuantity;
            $newPrice = $unitPrice * $newQuantity;

            $cartItem->update(['price' => $newPrice]);

            return response()->json(['message' => 'Cart item updated successfully', 'data' => $cartItem], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update cart item'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            $quantityAdd = $cartItem->quantity;

            $item = Item::findOrFail($cartItem->item_id);

            DB::beginTransaction();

            try {
                $item->quantity += $quantityAdd;
                $item->save();

                $cartItem->delete();

                DB::commit();

                return response()->json(['message' => 'Cart item deleted successfully'], 200);
            } catch (\Exception $e) {

                DB::rollBack();
                return response()->json(['message' => 'Failed to delete cart item'], 500);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Cart item not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
