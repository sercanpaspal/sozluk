<?php

namespace App\Events;

use App\Models\Entry;
use App\Models\Like;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class LikeEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    protected $like;
    public $likesCount;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Like $like)
    {
        $this->likesCount = Entry::where('id', $like->entry_id)->withCount(['likes'])->first()->likes_count;
        $this->like = $like;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel("like-" . $this->like->entry_id);
    }
}
