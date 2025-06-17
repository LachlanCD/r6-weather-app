import NavBar from "@/components/nav-bar";

export default function AppHeader() {

    return (
        <>
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <NavBar />
            </header>
        </>
    );
}
