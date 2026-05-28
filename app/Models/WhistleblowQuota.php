<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WhistleblowQuota extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'period',
        'bata_remaining',
        'cendol_remaining',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
