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
            $report[] = $forecast;
        }

        $newReport = [
            'generated_at' => now()->toDateTimeString(),
            'cities' => $report,
        ];

        $filename = 'reports/all_reports.json';

        $existing = [];
        if (Storage::exists($filename)) {
            $existing = json_decode(Storage::get($filename), true) ?? [];
        }

        $existing[] = $newReport;

        Storage::put($filename, json_encode($existing, JSON_PRETTY_PRINT));
        $this->info('Appended generated report to all_reports.json');
    }
}
