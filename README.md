# Laravel Weather Forecast Application

This application is built with **Laravel 12** (PHP backend) and **React** (frontend) to fetch and display 5-day weather forecasts for selected Australian cities. It also generates a **daily weather report** saved to a file.

---

## Features

- Laravel API with `/api/forecast` route to retrieve weather data
- Artisan command: `php artisan forecast {cities?*}` to fetch and display forecasts in a table
- React frontend with a Tailwind UI dropdown to select and display forecast data
- Daily scheduled report that saves forecasts for key cities to a file

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/laravel-weather.git
cd laravel-weather
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node dependencies (for React frontend)

```bash
npm install
```

### 4. Set up environment
Copy .env.example to .env and configure as needed:
```bash
cp .env.example .env
php artisan key:generate
```
    Ensure your .env file has the API key for weatherbit.io assigned to WEATHER_API_KEY.

### 5. Serve the application
```bash
php artisan serve
```
Access via: http://localhost:8000

## Running Forecast Commands
Fetch weather forecast for one or more cities:
```bash
php artisan forecast Brisbane "Gold Coast" "Sunshine Coast"
```
If no city is provided, you’ll be prompted to enter one interactively.

## API Usage
Endpoint:
```bash
GET /api/forecast?city=Brisbane
```
Returns JSON weather forecast data.

## Frontend (React)
make sure to either run
```bash
npm run build
```
    to build the application
or
```bash
npm run dev
```
    to serve the frontend

## Daily Report
Each day, the app runs a scheduled task that:

    Fetches forecasts for Brisbane, Gold Coast, Sunshine Coast

    Saves the results to: storage/app/private/reports/daily_forecast_YYYY-MM-DD.txt

### Run Manually:
```bash
php artisan forecast:daily-report
```

### Automate with Laravel Scheduler:
To enable automatic daily execution at 6am:
```bash
crontab -e
```
Add:
```bash
* * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
```

## Assumptions
I assumed that the automatically generated reports were separate from the forecast command and would need to be saved, this is currently done with a simple text file, however this could be transferred to a .csv or database to enable displaying on the react frontend in an overview page.
The React frontend simply queries the api through the Laravel backend to retrieve the most up to date data when a city is selected from the dropdown.
The console command does not limit the cities that can be queried as it was not specified. however, this can easily be added through the use of an array for allowed cities which gets compared to the entered cities through a array_diff and returned to the user as an error. 

## License
This project is open-sourced under the MIT license.

## Author
Built by Lachlan

Happy forecasting!
