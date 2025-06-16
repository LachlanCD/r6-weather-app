<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\WeatherService;
use Illuminate\Support\Facades\Storage;

class ForecastReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'forecast:daily-report';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates daily forecast report for key cities';

    /**
     * Execute the console command.
     */
    public function handle(WeatherService $weatherService): void
    {
        $cities = ['Brisbane', 'Gold Coast', 'Sunshine Coast'];
        $report = [];

        foreach ($cities as $city) {
            $forecast = $weatherService->getForecast($city);
            if (!$forecast || empty($forecast['data'])) {
                $this->error("No forecast data for $city");
                continue;
            }

            $report[] = "Forecast for $city:\n";
            foreach ($forecast['data'] as $i => $day) {
                $dayNum = $i + 1;
                $line = "  Day $dayNum: Avg: {$day['temp']}, Max: {$day['max_temp']}, Min: {$day['min_temp']}";
                $report[] = $line;
            }

            $report[] = ""; // blank line between cities
        }

        $filename = 'daily_forecast_' . now()->format('Y-m-d') . '.txt';
        Storage::put("reports/$filename", implode("\n", $report));

        $this->info("Forecast saved to storage/app/private/reports/$filename");
    }
}
