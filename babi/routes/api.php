<?php

use App\Http\Controllers\Api\PrestaireController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\ServiceController;

Route::apiResource('prestataires', PrestaireController::class);
Route::apiResource('categories', CategorieController::class);
Route::apiResource('services', ServiceController::class);