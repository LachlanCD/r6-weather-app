<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;

class WeatherController extends Controller
{
    public function getWeather($city, WeatherService $weatherService)
    {
        $data = $weatherService -> getForecast($city);

        if (!$data) {
            return response() -> json(['error' => 'Unable to fetch weather data'], 500);
        }

        return response()->json($data);
    }
}
