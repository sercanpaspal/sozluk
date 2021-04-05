<?php

namespace App\Models;

use App\Events\LikeEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = ["entry_id", "user_id"];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($instance) {
            $instance->user_id = $instance->user_id ?? auth()->user()->id;
        });

        static::created(function ($instance) {
            broadcast(new LikeEvent($instance));
        });

        static::deleted(function ($instance) {
            broadcast(new LikeEvent($instance));
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
}
