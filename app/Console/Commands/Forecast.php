<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\WeatherService;

class Forecast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'forecast {cities?*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch 5-day weather forecast for given cities';

    /**
     * Execute the console command.
     */
    public function handle(WeatherService $weatherService)
    {
        $cities = $this->argument('cities');

        if (empty($cities)) {
            $input = $this->anticipate(
                'No cities provided. Please enter city names (comma separated)',
                ['Brisbane', 'Gold Coast', 'Sunshine Coast']
            );

            if (!$input) {
                $this->error('No cities entered. Exiting.');
                return;
            }

            // Split by comma and trim whitespace
            $cities = array_map('trim', explode(',', $input));
        }

        $rows = [];

        foreach ($cities as $city) {
            $data = $weatherService->getForecast($city);

            if (!$data || empty($data['data'])) {
                $this->error("Could not fetch forecast for {$city}.");
                continue;
            }

            // Format each of the 5 days
            $days = $data['data'];
            $daySummaries = [];

            foreach ($days as $day) {
                $avg = $day['temp'] ?? 'N/A';
                $max = $day['max_temp'] ?? 'N/A';
                $min = $day['min_temp'] ?? 'N/A';

                $summary = "Avg: {$avg}, Max: {$max}, Low: {$min}";
                $daySummaries[] = $summary;
            }

            // Pad if less than 5 days
            while (count($daySummaries) < 5) {
                $daySummaries[] = 'No Data';
            }

            $cityName = $data['city'];
            $rows[] = array_merge([$cityName], $daySummaries);
        }
        $this->table(
            ['City', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            $rows
        );
    }
}
