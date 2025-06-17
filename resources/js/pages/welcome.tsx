import ForecastPage from './forecast-page';
import HeadLayout from '@/layouts/app/app-head';
import AppHeader from '@/components/app-header';

export default function Welcome() {

    return (
        <>
            <HeadLayout title={'Forecast'} />
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-200 via-white to-blue-100 p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <AppHeader />
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full flex-col-reverse lg:max-w-4xl ">
                        <ForecastPage />
                    </main>
                </div>
            </div>
        </>
    );
}
