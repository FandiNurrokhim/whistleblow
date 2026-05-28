import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/Atoms/PageHeader";
import UserTable from "@/Pages/Admin/RBAC/User/_partials/UserTable";
import TitleCard from "@/Components/Atoms/TitleCard";
import StatCard from "@/Components/Atoms/StatCard";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "react-i18next";
const UserPage = () => {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <PageHeader
                    title={t("global.user")}
                    subtitle={t("user.pageSubtitle")}
                />

                <Breadcrumbs className="bg-slate-800 p-2 rounded-md text-white mb-4">
                    <Link href="dashboard" className="opacity-60 hover:opacity-100">
                        Dashboard
                    </Link>
                    <span>{t("global.user")}</span>
                </Breadcrumbs>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TitleCard
                        header={t("user.welcome")}
                        description={t("user.description")}
                    />

                    <StatCard
                        label={`Total ${t("global.user")}`}
                        value={usePage().props.userCount || "0"}
                        icon={UserGroupIcon}
                    />
                </div>
                <UserTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default UserPage;