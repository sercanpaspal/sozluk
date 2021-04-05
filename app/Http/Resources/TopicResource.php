<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            "title" => $this->title,
            "slug" => $this->slug,
            "entries_count" => $this->when(isset($this->entries_count), $this->entries_count),
            "user" => UserResource::make($this->whenLoaded('user')),
            "entries" => EntryResource::collection($this->whenLoaded('entries')),
            "entry" => EntryResource::make($this->whenLoaded('entry')),
        ];
    }
}
