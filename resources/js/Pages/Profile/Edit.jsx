import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from "react";
import AuthModal from '@/Components/Organisms/AuthModal';
import PageHeader from "@/Components/Atoms/PageHeader";
import { useTranslation } from 'react-i18next';

import { ChevronDownIcon, ChevronRightIcon, UserIcon, KeyIcon, TrashIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import Avatar from "@/Components/Molecules/Avatar";


function AccordionItem({ label, icon, open, onClick, children }) {
    return (
        <div className="border-b last:border-b-0">
            <button
                className="flex items-center w-full py-3 text-left focus:outline-none"
                onClick={onClick}
            >
                {icon}
                <span className="flex-1 font-medium">{label}</span>
                {open ? (
                    <ChevronDownIcon className="w-5 h-5" />
                ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                )}
            </button>
            {open && <div className="px-3 pb-4">{children}</div>}
        </div>
    );
}

function ProfileAccordion() {
    const [open, setOpen] = useState(null);
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <AccordionItem
                label={t("profile.updateInformation")}
                icon={<UserIcon className="w-6 h-6 mr-2 text-gray-500" />}
                open={open === 0}
                onClick={() => setOpen(open === 0 ? null : 0)}
            >
                <UpdateProfileInformationForm />
            </AccordionItem>
            <AccordionItem
                label={t("profile.updatePassword")}
                icon={<KeyIcon className="w-6 h-6 mr-2 text-gray-500" />}
                open={open === 1}
                onClick={() => setOpen(open === 1 ? null : 1)}
            >
                <UpdatePasswordForm />
            </AccordionItem>
            <AccordionItem
                label={t("profile.deleteAccount")}
                icon={<TrashIcon className="w-6 h-6 mr-2 text-red-500" />}
                open={open === 2}
                onClick={() => setOpen(open === 2 ? null : 2)}
            >
                <DeleteUserForm />
            </AccordionItem>
        </div>
    );
}

const NotLoggedIn = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const { t } = useTranslation();

    return (
        <>
            <AuthenticatedLayout>
                <div className="flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-blue-100">
                        <ArrowLeftOnRectangleIcon className="w-12 h-12 text-blue-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{t("profile.youreNotLogin")}</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        {t("profile.pleaseLoginToAccessYourProfile")}
                    </p>
                    <button
                        onClick={() => {
                            setAuthMode("login");
                            setShowAuthModal(true);
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
                    >
                        {t("global.login")}
                    </button>
                </div>

                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    defaultMode={authMode}
                />
            </AuthenticatedLayout>
        </>
    );
};

export default function Edit() {
    const { auth } = usePage().props;
    const { t } = useTranslation();

    if (!auth?.user) {
        return <NotLoggedIn />;
    }

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Profil"
                subtitle="Ubah Informasi pribadi anda"
            />
            <div className="py-12 bg-white h-[80vh]">
                <div className="mx-auto max-w-7xl px-4 space-y-2 sm:px-6 lg:px-8 overflow-y-scroll h-full">
                    <section className="flex items-center space-x-4 mb-8">
                        <Avatar imagePath={auth.user.photo_profile} name={auth.user?.name} />

                        <div className="flex-grow">
                            <div className="flex items-center space-x-2">
                                <h2 className="text-xl font-bold text-gray-900">{auth.user?.name}</h2>
                            </div>
                            <p className="text-gray-600 select-text">{auth.user?.email}</p>
                            <p className="text-gray-600 select-text">{auth.user?.phone}</p>
                        </div>
                    </section>

                    <ProfileAccordion />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}