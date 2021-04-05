<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFollowRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function show($username)
    {
        return UserResource::make(User::where('username', $username)->withCount(['followers', 'followeds'])->with(['entries.topic', 'likes' => function ($q) {
            $q->has('entry')->with(['entry.topic']);
        }])->firstOrFail());
    }

    public function follow(UserFollowRequest $request, $username)
    {
        User::where('username', $username)->firstOrFail()->followers()->toggle($request->user()->id);
    }

    public function followers($username)
    {
        return UserResource::collection(User::whereHas('followeds', function ($q) use ($username) {
            $q->where('username', $username);
        })->paginate(5));
    }

    public function followeds($username)
    {
        return UserResource::collection(User::whereHas('followers', function ($q) use ($username) {
            $q->where('username', $username);
        })->paginate(5));
    }
}
