import { Link } from '@inertiajs/react';

export default function NavBar() {

    return (
        <>
            <nav className="fixed top-10 left-0 w-full z-50 p-4 flex space-x-20 justify-center animate-fade-in">
                <Link
                    href={route('home')}
                    className="inline-block px-10 py-1.5 text-lg leading-normal text-[#1b1b18] transition-transform transform hover:scale-130"
                >
                    Forecast
                </Link>
                <Link
                    href={route('reports')}
                    className="inline-block px-10 py-1.5 text-lg leading-normal text-[#1b1b18] transition-transform transform hover:scale-130"
                >
                    Reports
                </Link>
            </nav>
        </>
    );
}
