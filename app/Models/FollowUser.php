<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FollowUser extends Pivot
{
    use HasFactory;

    protected $table = "follow_user";
}
