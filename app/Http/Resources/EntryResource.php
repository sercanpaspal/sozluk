<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "content" => $this->content,
            "topic" => TopicResource::make($this->whenLoaded('topic')),
            "user" => UserResource::make($this->whenLoaded('user')),
            "is_like" => $this->whenLoaded('isLike', true, false),
            "likes" => LikeResource::collection($this->whenLoaded('likes')),
            "likes_count" => $this->when(isset($this->likes_count), $this->likes_count, 0),
            "created_at" => $this->created_at,
        ];
    }
}
