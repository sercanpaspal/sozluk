<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "entry_id", "complaint_subject_id", "content"];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($instance) {
            $instance->user_id = $instance->user_id ?? auth()->user()->id;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function entry()
    {
        return $this->belongsTo(Entry::class);
    }

    public function complaintSubject()
    {
        return $this->belongsTo(ComplaintSubject::class);
    }
}
