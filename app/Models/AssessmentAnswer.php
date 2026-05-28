<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssessmentAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'criteria_id',
        'score',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'integer',
        ];
    }

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function criteria()
    {
        return $this->belongsTo(AssessmentCriteria::class, 'criteria_id');
    }
}
