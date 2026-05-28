import Sidebar from '@/Layouts/SideBar';
import Header from '@/Layouts/Header';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar sticky */}
            <div className="sticky top-0 left-0 z-30 h-screen w-auto">
                <Sidebar />
            </div>

            <div id="scrollableDiv" className="flex-1 h-screen bg-slate-200 flex flex-col overflow-y-scroll">
                {/* Header sticky */}
                <div className="sticky top-0 z-20 w-full">
                    <Header />
                </div>

                {/* Main content with scroll */}
                <main className="px-4 sm:px-6 py-5 lg:px-8 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}