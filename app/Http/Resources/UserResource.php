<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "name" => $this->name,
            "username" => $this->username,
            "is_follow" => $this->whenLoaded('isFollow', true, false),
            "entries" => EntryResource::collection($this->whenLoaded('entries')),
            "likes" => LikeResource::collection($this->whenLoaded('likes')),
            "followers_count" => $this->when(isset($this->followers_count), $this->followers_count),
            "followeds_count" => $this->when(isset($this->followeds_count), $this->followeds_count),
        ];
    }
}
