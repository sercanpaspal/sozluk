<?php

namespace App\Models;

use App\Events\EntryEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entry extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "content",
        "topic_id",
        "user_id",
    ];

    protected $with = ['user', 'isLike'];

    protected $withCount = ['likes'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($instance) {
            $instance->user_id = $instance->user_id ?? auth()->user()->id;
        });

        static::created(function ($instance) {
            broadcast(new EntryEvent($instance));
        });
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }

    public function isLike()
    {
        return $this->hasOne(Like::class)->where('user_id', auth()->user()->id ?? null);
    }
}
