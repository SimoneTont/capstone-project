<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'item_id',
        'quantity',
        'amount_paid',
    ];

    /**
     * Get the user who bought the sold item.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the item that was sold.
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
