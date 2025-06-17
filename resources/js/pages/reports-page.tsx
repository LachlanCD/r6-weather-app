import HeadLayout from '@/layouts/app/app-head';
import AppHeader from '@/components/app-header';

import { useEffect, useState } from 'react';

type DayForecast = {
    temp: number;
    max_temp: number;
    min_temp: number;
};

type CityForecast = {
    city: string;
    data: DayForecast[];
};

type ReportData = {
    generated_at: string;
    cities: CityForecast[];
};

export default function Reports() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {

            setLoading(true);
            setError(null);

            try {
                const res = await fetch('/api/reports');
                if (!res.ok) {
                    throw new Error('Failed to fetch reports');
                }
                const data: ReportData[] = await res.json();
                setReports(data);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const selectedReport = reports[selectedIndex];

    return (
        <>
            <HeadLayout title={'Reports'} />
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-200 via-white to-blue-100 p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <AppHeader />
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full flex-col-reverse lg:max-w-4xl ">
                        <div className="min-h-screen flex items-start justify-center p-6 mt-20">
                            <div className="bg-sky-50 bg-opacity-80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl p-8 max-w-xl w-full">
                                <h1 className="text-2xl font-bold mb-4">Weather Reports</h1>

                                {loading && <p className="text-sky-500">Loading forecast...</p>}
                                {error && <p className="text-rose-400">Error: {error}</p>}


                                {reports.length > 0 && (
                                    <>
                                        <select
                                            className="mb-6 px-4 py-2 border rounded"
                                            value={selectedIndex}
                                            onChange={(e) => setSelectedIndex(Number(e.target.value))}
                                        >
                                            {reports.map((r, i) => (
                                                <option key={i} value={i}>
                                                    {r.generated_at}
                                                </option>
                                            ))}
                                        </select>

                                        <p className="text-sm text-gray-600 mb-4">
                                            Showing report from: {selectedReport.generated_at}
                                        </p>

                                        {selectedReport.cities.map((city) => (
                                            <div key={city.city} className="mb-4 p-4 bg-blue-100 rounded">
                                                <h2 className="text-lg font-semibold">{city.city}</h2>
                                                {city.data.map((day, idx) => (
                                                    <p key={idx}>
                                                        Day {idx + 1}: Avg: {day.temp}°C, Max: {day.max_temp}°C, Min: {day.min_temp}°C
                                                    </p>
                                                ))}
                                            </div>
                                        ))}

                                    </>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
