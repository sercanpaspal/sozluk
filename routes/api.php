<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ComplaintSubjectController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth',

], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

});

Route::resource('user', UserController::class);
Route::resource('topic', TopicController::class);

Route::get('topic/{query}/search', [TopicController::class, 'search']);

Route::get('topic/{type}/get', [TopicController::class, 'get'])->where('type', 'latest|newest');

Route::get('topic/{type}/entries', [TopicController::class, 'entries']);

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::resource('complaint', ComplaintController::class);

    Route::get('complaint-subject/options', [ComplaintSubjectController::class, 'options']);

    Route::resource('entry', EntryController::class);

    Route::post('like/toggle', [LikeController::class, 'toggle']);

    Route::post('user/{username}/follow', [UserController::class, 'follow']);

    Route::get('user/{username}/followers', [UserController::class, 'followers']);
    Route::get('user/{username}/followeds', [UserController::class, 'followeds']);
});
