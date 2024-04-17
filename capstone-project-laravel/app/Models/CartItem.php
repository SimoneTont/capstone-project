<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_items';

    protected $fillable = [
        'item_id',
        'user_id',
        'quantity',
        'price',
    ];

    /**
     * Get the item associated with the cart item.
     */
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    /**
     * Get the user associated with the cart item.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
