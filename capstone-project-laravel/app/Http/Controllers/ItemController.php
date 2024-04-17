<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = new Item();
        $item->name = $request->input('name');
        $item->description = $request->input('description');
        $item->quantity = $request->input('quantity');
        $item->image_path = $request->input('image_path');
        $item->save();

        return response()->json($item, 201);
    }
    public function show($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }
        return response()->json($item);
    }
    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }
        $item->name = $request->input('name');
        $item->description = $request->input('description');
        $item->quantity = $request->input('quantity');
        $item->image_path = $request->input('image_path');
        $item->save();

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }
        $item->delete();

        return response()->json(['message' => 'Item deleted'], 200);
    }

    public function cart(Request $request, $id)
    {
        $data = $request->only(['user_id', 'quantity', 'price']);
        $data['item_id'] = $id;

        try {
            $item = Item::findOrFail($id);

            if ($item->quantity < $data['quantity']) {
                return response()->json(['message' => 'Insufficient item quantity'], 400);
            }

            DB::beginTransaction();

            try {
                $item->quantity -= $data['quantity'];
                $item->save();

                CartItem::create($data);

                DB::commit();

                return response()->json($data, 200);
            } catch (\Exception $e) {
                DB::rollback();
                Log::error('Error processing purchase: ' . $e->getMessage());
                return response()->json(['message' => 'Failed to process purchase'], 500);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Item not found'], 404);
        }
    }
}
