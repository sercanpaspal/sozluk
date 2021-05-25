<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        "title",
        "slug",
        "user_id"
    ];

    protected $withCount = ['entries'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($instance) {
            $instance->user_id = $instance->user_id ?? auth()->user()->id;
        });
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
            ],
        ];
    }

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = strtolower($value);
    }

    public function entries()
    {
        return $this->hasMany(Entry::class);
    }

    public function entry()
    {
        return $this->hasOne(Entry::class);
    }

    public function scopeListByType(Builder $builder, $type)
    {
        switch ($type) {
            case 'latest':
                $builder->latests();
                break;
            case 'newest':
                $builder->newest();
                break;
        }

        return $builder;
    }

    public function scopeWithLastEntry(Builder $builder)
    {
        return $builder
            ->with(['entry' => function ($q) {
                $q->orderBy('created_at', 'desc');
            }]);
    }

    public function scopeWithPopularEntry(Builder $builder)
    {
        return $builder
            ->with(['entry' => function ($q) {
                $q
                    ->withCount(['likes'])
                    ->orderBy('likes_count', 'DESC')
                    ->orderBy('created_at', 'DESC');
            }]);
    }

    public function scopeLatests(Builder $builder)
    {
        return $builder
            ->has('entry')
            ->withPopularEntry()
            ->orderBy('entries_count',  'DESC');
    }

    public function scopeNewest(Builder $builder)
    {
        return $builder
            ->has('entry')
            ->withLastEntry()
            ->orderByRaw('(SELECT e.created_at FROM entries as e WHERE e.topic_id = topics.id ORDER BY e.created_at and e.deleted_at is null desc LIMIT 1) DESC');
    }
}
