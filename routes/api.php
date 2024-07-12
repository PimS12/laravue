<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh_tokens', [AuthController::class, 'refresh']);

    Route::get('user', [UserController::class, 'current']);

    Route::patch('settings/profile', [ProfileController::class, 'update']);
    Route::patch('settings/password', [PasswordController::class, 'update']);
});


Route::group([

    'middleware' => 'api',
    // 'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

});

// Route::group(['middleware' => 'guest:api'], function () {
//     Route::post('login', [AuthController::class, 'login']);
//     Route::post('register', [RegisterController::class, 'register']);

//     Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
//     Route::post('password/reset', [ResetPasswordController::class, 'reset']);

//     Route::post('email/verify/{user}', [VerificationController::class, 'verify'])->name('verification.verify');
//     Route::post('email/resend', [VerificationController::class, 'resend']);

//     Route::post('oauth/{driver}', [OAuthController::class, 'redirect']);
//     Route::get('oauth/{driver}/callback', [OAuthController::class, 'handleCallback'])->name('oauth.callback');
// });

