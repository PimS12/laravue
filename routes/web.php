<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaController;

Route::get('{any}', SpaController::class)->where('any', '.*');
