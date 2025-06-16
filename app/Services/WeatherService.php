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

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();

        $forecastDays = collect($data['data'])
            ->take(5)
            ->map(function ($day) {
                return [
                    'temp' => $day['temp'],
                    'max_temp' => $day['max_temp'],
                    'min_temp' => $day['min_temp'],
                ];
            })
            ->toArray();
        return [
            'city' => ucwords($city),
            'data' => $forecastDays,
        ];
    }
}
