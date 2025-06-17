<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForecastController;
use App\Http\Controllers\ReportController;

Route::get('/forecast', [ForecastController::class, 'getForecast']);
Route::get('/reports', [ReportController::class, 'getReport']);
