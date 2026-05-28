import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ClipboardDocumentListIcon, CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Atoms/StatCard";
import TitleCard from "@/Components/Atoms/TitleCard";
import AssessmentTable from "./_partials/AssessmentTable";

const AssessmentPage = () => {
    const { stats } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Penilaian 360°</h1>
                        <nav className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Link href={route("admin.dashboard.index")} className="hover:text-blue-600">Dashboard</Link> {/* admin.dashboard.index stays */}
                            <span>/</span>
                            <span>Penilaian</span>
                        </nav>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TitleCard
                        header="Penilaian 360°"
                        description="Manajer menilai staff, staff menilai rekan satu tim dengan bobot berbeda."
                    />
                    <StatCard
                        label="Total Penilaian"
                        value={stats?.total ?? 0}
                        icon={ClipboardDocumentListIcon}
                    />
                    <StatCard
                        label="Selesai"
                        value={stats?.completed ?? 0}
                        icon={CheckCircleIcon}
                        className="bg-green-50"
                    />
                    <StatCard
                        label="Draft"
                        value={stats?.draft ?? 0}
                        icon={PencilSquareIcon}
                        className="bg-yellow-50"
                    />
                </div>

                <AssessmentTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default AssessmentPage;
