<?php

use App\Http\Controllers\Api\PrestaireController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\AdminDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('prestataires', PrestaireController::class);
Route::apiResource('categories', CategorieController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('reservations', ReservationController::class);


Route::get('admin/dashboard', [AdminDashboardController::class, 'index']);
Route::patch('admin/prestataires/{id}/valider', [AdminDashboardController::class, 'validerPrestataire']);
Route::patch('admin/prestataires/{id}/rejeter', [AdminDashboardController::class, 'rejeterPrestataire']);