<?php

namespace App\Events;

use App\Http\Resources\EntryResource;
use App\Models\Entry;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class EntryEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $entry;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Entry $entry)
    {
        $this->entry = EntryResource::make(Entry::with(['user'])->findOrFail($entry->id));
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel($this->entry->topic->slug);
    }
}
