import { usePage } from "@inertiajs/react";
import Sidebar from "@/Layouts/SideBar";
import Header from "@/Layouts/Header";
import UserLayout from "@/Layouts/UserLayout";

const ADMIN_ROLES = ["Super Admin", "Admin", "HR"];

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const roles     = auth?.user?.roles ?? [];
    const isAdmin   = roles.some((r) => ADMIN_ROLES.includes(r.name));

    if (!isAdmin) {
        return <UserLayout>{children}</UserLayout>;
    }

    return (
        <div className="flex h-screen">
            <div className="sticky top-0 left-0 z-30 h-screen w-auto">
                <Sidebar />
            </div>

            <div id="scrollableDiv" className="flex-1 h-screen bg-slate-200 flex flex-col overflow-y-scroll">
                <div className="sticky top-0 z-20 w-full">
                    <Header />
                </div>
                <main className="px-4 sm:px-6 py-5 lg:px-8 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
