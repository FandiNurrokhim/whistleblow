<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssessmentCriteria extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'assessment_criteria';

    protected $fillable = [
        'name',
        'description',
        'weight_manager',
        'weight_staff',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'weight_manager' => 'float',
            'weight_staff'   => 'float',
            'is_active'      => 'boolean',
        ];
    }

    public function answers()
    {
        return $this->hasMany(AssessmentAnswer::class, 'criteria_id');
    }
}
