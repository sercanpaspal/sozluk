<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicStoreRequest;
use App\Http\Resources\EntryResource;
use App\Http\Resources\TopicResource;
use App\Models\Entry;
use App\Models\Topic;

class TopicController extends Controller
{
    public function get($type)
    {
        return TopicResource::collection(Topic::listByType($type)->withCount(['entries'])->paginate(5));
    }

    public function search($query)
    {
        return Topic::where('title', $query)->with(['entries.user'])->firstOrFail();
    }

    public function store(TopicStoreRequest $request)
    {
        $topic = Topic::create($request->validated());

        $topic->entries()->save(new Entry($request->validated()));

        return TopicResource::make($topic);
    }

    public function show($slug)
    {
        return TopicResource::make(Topic::where('slug', $slug)->firstOrFail());
    }

    public function entries($slug)
    {
        return EntryResource::collection(Entry::withCount('likes')->with(['user', 'isLike'])->whereHas('topic', function ($q) use ($slug) {
            $q->where('slug', $slug);
        })->orderBy('created_at', 'desc')->paginate(10));
    }
}
