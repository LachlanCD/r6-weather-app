<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function getForecast(string $city): ?array
    {
        $response = Http::get('http://api.weatherbit.io/v2.0/forecast/daily', [
            'key' => config('services.weather.key'),
            'city' => $city,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }
}

