import { type  ForecastResponse } from '@/types';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const [city, setCity] = useState<string>('');
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cities = ['Brisbane', 'Gold Coast', 'Sunshine Coast'];

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        setError(null);

        fetch(`api/forecast?city=${encodeURIComponent(city)}`)
            .then((res) => {
                if (!res.ok) throw new Error('Error fetching forecast');
                return res.json();
            })
            .then((data: ForecastResponse) => {
                setForecast(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [city]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Select a City</h1>

                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Choose a city --</option>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    {loading && <p className="text-blue-500">Loading forecast...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {forecast?.data && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Forecast for {forecast.city}
                            </h2>
                            <div className="space-y-2">
                                {forecast.data.map((day, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-blue-100 rounded border border-blue-200"
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
        </>
    );
}
