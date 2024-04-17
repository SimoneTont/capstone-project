<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SoldItem;

class SoldItemsController extends Controller
{
    /**
     * Display a listing of the sold items for a given user.
     *
     * @param int $userId The ID of the user whose sold items to fetch
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($userId)
    {
        try {
            $soldItems = SoldItem::where('user_id', $userId)->with('item')->get();
            return response()->json($soldItems, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch sold items: ' . $e->getMessage()], 500);
        }
    }
}
