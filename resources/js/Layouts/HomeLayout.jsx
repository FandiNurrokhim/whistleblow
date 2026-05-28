import { usePage } from '@inertiajs/react';

import Navbar from './Navbar';
import HomeCarousel from '@/Components/Organisms/HomeCarousel';
import Footer from './Footer';
import BottomNav from './BottomNav';

export default function HomeLayout({ className, children }) {
    const { url } = usePage();
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {url === "/home" && (
                <div className="bg-gradient-to-b from-white to-teal-100 py-2 mb-2">
                    <div className="max-w-7xl mx-auto">
                        <HomeCarousel />
                    </div>
                </div>
            )}
            <main
                className={`max-w-7xl mx-auto space-y-8 pb-20 ${className}`} >
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div >
    );
}
