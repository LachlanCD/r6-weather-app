import { useState, useEffect } from 'react';
import Dropdown from '@/components/dropdown';
import { type ForecastResponse } from '@/types';

export default function ForecastPage() {
    const [city, setCity] = useState<string>('');
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cities = ['Brisbane', 'Gold Coast', 'Sunshine Coast'];

    useEffect(() => {
        const fetchForecast = async () => {
            if (!city) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`api/forecast?city=${encodeURIComponent(city)}`);
                if (!response.ok) {
                    throw new Error('Error fetching forecast');
                }

                const data: ForecastResponse = await response.json();
                setForecast(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [city]);

    return (
        <div className="min-h-screen flex items-start justify-center p-6 mt-20">
            <div className="bg-sky-50 bg-opacity-80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-8 max-w-xl w-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Select a City</h1>

                <Dropdown
                    label="City"
                    options={cities}
                    selected={city}
                    onChange={setCity}
                />

                {loading && <p className="text-sky-500">Loading forecast...</p>}
                {error && <p className="text-rose-400">Error: {error}</p>}

                {forecast?.data && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            Forecast for {forecast.city}
                        </h2>
                        <div className="space-y-2">
                            {forecast.data.map((day, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-sky-100 rounded border border-sky-200"
                                >
                                    <p className="text-sm font-medium text-gray-800">
                                        Day {index + 1}
                                    </p>
                                    <p className="text-gray-600">
                                        Avg: {day.temp}, Max: {day.max_temp}, Low: {day.min_temp}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

