<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assessment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'assessor_id',
        'assessee_id',
        'period',
        'type',
        'final_score',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'final_score' => 'float',
        ];
    }

    public function assessor()
    {
        return $this->belongsTo(User::class, 'assessor_id');
    }

    public function assessee()
    {
        return $this->belongsTo(User::class, 'assessee_id');
    }

    public function answers()
    {
        return $this->hasMany(AssessmentAnswer::class);
    }
}
