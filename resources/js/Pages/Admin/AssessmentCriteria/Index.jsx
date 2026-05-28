import React from "react";
import { Link } from "@inertiajs/react";
import { ScaleIcon } from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitleCard from "@/Components/Atoms/TitleCard";
import AssessmentCriteriaTable from "./_partials/AssessmentCriteriaTable";

const AssessmentCriteriaPage = () => {
    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Kriteria Penilaian</h1>
                        <nav className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Link href={route("admin.dashboard.index")} className="hover:text-blue-600">Dashboard</Link>
                            <span>/</span>
                            <span>Kriteria Penilaian</span>
                        </nav>
                    </div>
                </div>

                <TitleCard
                    header="Kriteria Penilaian 360°"
                    description="Atur kriteria beserta bobot penilaian untuk manajer dan antar staff."
                    icon={<ScaleIcon className="w-6 h-6 text-blue-600" />}
                />

                <AssessmentCriteriaTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default AssessmentCriteriaPage;
