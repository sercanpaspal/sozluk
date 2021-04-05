<?php

namespace App\Http\Controllers;

use App\Http\Requests\LikeToggleRequest;
use App\Models\Like;

class LikeController extends Controller
{
    public function toggle(LikeToggleRequest $request)
    {
        if ($like = Like::where('entry_id', $request->entry_id)->where('user_id', $request->user()->id)->first()) {
            return $like->delete();
        } else {
            return Like::create($request->validated());
        }
    }
}
