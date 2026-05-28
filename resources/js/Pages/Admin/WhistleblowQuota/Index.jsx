import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitleCard from "@/Components/Atoms/TitleCard";
import QuotaTable from "./_partials/QuotaTable";

const WhistleblowQuotaPage = () => {
    const { periodOptions, bataDefault, cendolDefault } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pengaturan Kuota Whistleblow</h1>
                    <nav className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <Link href={route("admin.dashboard.index")} className="hover:text-blue-600">Dashboard</Link>
                        <span>/</span>
                        <Link href={route("whistleblow.index")} className="hover:text-blue-600">Whistleblow</Link>
                        <span>/</span>
                        <span>Kuota</span>
                    </nav>
                </div>

                <TitleCard
                    header="Kuota Whistleblow"
                    description={`Kelola kuota bata (default: ${bataDefault}x) dan cendol (default: ${cendolDefault}x) per pengguna per periode.`}
                    icon={<ShieldExclamationIcon className="w-6 h-6 text-orange-500" />}
                />

                <QuotaTable periodOptions={periodOptions} />
            </div>
        </AuthenticatedLayout>
    );
};

export default WhistleblowQuotaPage;
