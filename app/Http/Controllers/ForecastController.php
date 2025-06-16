<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WeatherService;

class ForecastController extends Controller
{
    public function getForecast(Request $request, WeatherService $weatherService)
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $data = $weatherService->getForecast($city);

        return $data
            ? response()->json($data)
            : response()->json(['error' => 'Unable to fetch forecast'], 500);
    }
}
