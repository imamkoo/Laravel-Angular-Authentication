<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChangePasswordController;

Route::group([

    'middleware' => 'api',

], function () {

    Route::post('login', [AuthController::class, "login"]);
    Route::post('signup', [AuthController::class, "signup"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);
    Route::post('me', [AuthController::class, "me"]);

    Route::post('sendPasswordResetLink', [ResetPasswordController::class, "sendEmail"]);
    Route::post('resetPassword', [ChangePasswordController::class, "process"]);
});