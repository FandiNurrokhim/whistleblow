import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/Atoms/PageHeader";
import TitleCard from "@/Components/Atoms/TitleCard";
import RoleTable from "@/Pages/Admin/RBAC/Roles/_partials/RoleTable";
import { useTranslation } from "react-i18next";

const RolesPage = () => {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <PageHeader
                    title={t("role.pageTitle")}
                    subtitle={t("role.pageSubtitle")}
                />

                <Breadcrumbs className="bg-slate-800 p-2 rounded-md text-white mb-4">
                    <Link href="dashboard" className="opacity-60 hover:opacity-100">
                        Dashboard
                    </Link>
                    <span>{t("role.pageTitle")}</span>
                </Breadcrumbs>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TitleCard
                        header={t("role.welcome")}
                        description={t("role.description")}
                    />
                </div>
                <RoleTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default RolesPage;