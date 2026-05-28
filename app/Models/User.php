<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasRoles, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'photo_profile',
        'is_approved',
        'approved_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'approved_at'       => 'datetime',
            'password'          => 'hashed',
            'is_approved'       => 'boolean',
        ];
    }

    // ─── Assessment Relations ──────────────────────────────────────────────

    public function assessmentsAsAssessor()
    {
        return $this->hasMany(Assessment::class, 'assessor_id');
    }

    public function assessmentsAsAssessee()
    {
        return $this->hasMany(Assessment::class, 'assessee_id');
    }

    public function whistleblowReportsGiven()
    {
        return $this->hasMany(WhistleblowReport::class, 'reporter_id');
    }

    public function whistleblowReportsReceived()
    {
        return $this->hasMany(WhistleblowReport::class, 'reported_id');
    }

    public function whistleblowQuota()
    {
        return $this->hasOne(WhistleblowQuota::class);
    }
}
