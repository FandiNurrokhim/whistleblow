import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ExclamationTriangleIcon, HandThumbUpIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Atoms/StatCard";
import TitleCard from "@/Components/Atoms/TitleCard";
import WhistleblowTable from "./_partials/WhistleblowTable";

const WhistleblowPage = () => {
    const { quota } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Whistleblow</h1>
                    <nav className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Link href={route("admin.dashboard.index")} className="hover:text-blue-600">Dashboard</Link> {/* admin.dashboard.index stays */}
                        <span>/</span>
                        <span>Whistleblow</span>
                    </nav>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TitleCard
                        header="Bata & Cendol"
                        description="Laporkan insiden (bata) atau apresiasi budaya kerja baik (cendol) rekan satu tim."
                    />
                    <StatCard
                        label="Sisa Kuota Bata"
                        value={quota?.bata_remaining ?? 0}
                        icon={ExclamationTriangleIcon}
                        className="bg-red-50"
                    />
                    <StatCard
                        label="Sisa Kuota Cendol"
                        value={quota?.cendol_remaining ?? 0}
                        icon={HandThumbUpIcon}
                        className="bg-green-50"
                    />
                </div>

                {quota?.bata_remaining === 0 && (
                    <div className="flex items-center gap-2 rounded-md bg-red-100 border border-red-300 px-4 py-3 text-sm text-red-700">
                        <ShieldExclamationIcon className="w-5 h-5 flex-shrink-0" />
                        <span>Kuota bata Anda sudah habis untuk periode ini ({quota?.period}).</span>
                    </div>
                )}

                <WhistleblowTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default WhistleblowPage;
