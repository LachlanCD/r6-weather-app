<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
    protected $description = 'Print the forecast for one or more cities for the next 5 days';

    protected array $allowedCities = [
        'Brisbane',
        'Gold Coast',
        'Sunshine Coast',
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cities = $this -> argument('cities');

        if (empty($cities)) {
            $this -> info("No cities provided.");
            return;
        }

        $invalidCities = array_diff($cities, $this -> allowedCities);

        if (!empty($invalidCities)) {
            $this -> error('Invalid cities: ' . implode(', ', $invalidCities));
            $this -> info('Allowed cities: ' . implode(', ', $this -> allowedCities));
            return;
        }

        foreach ($cities as $city) {
            $this -> line("Forecast for: $city");
        }
    }
}
