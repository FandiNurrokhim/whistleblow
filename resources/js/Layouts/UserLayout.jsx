import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Avatar from "@/Components/Molecules/Avatar";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function UserLayout({ children }) {
    const { auth, menus = [] } = usePage().props;
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen]       = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const navMenus = menus.filter((m) => m.type === "PARENT");

    const isActive = (menuRoute) => {
        try { return window.location.pathname === new URL(route(menuRoute)).pathname; }
        catch { return false; }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-30 bg-[#1E3A8A] shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link href={route("admin.dashboard.index")} className="flex items-center gap-2 flex-shrink-0">
                            <ApplicationLogo className="w-8 h-8 text-white" />
                            <span className="text-white font-semibold text-sm hidden sm:block">360° Assessment</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navMenus.map((menu) => {
                                const title = i18n.language === "en" ? menu.title_en : menu.title_id;
                                const active = isActive(menu.route);
                                return (
                                    <Link
                                        key={menu.id}
                                        href={menu.route ? route(menu.route) : "#"}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            active
                                                ? "bg-white/20 text-white"
                                                : "text-blue-100 hover:bg-white/10 hover:text-white"
                                        }`}
                                    >
                                        <i className={`${menu.icon || "fa-solid fa-circle"} text-xs`} />
                                        {title}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* User Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsOpen((p) => !p)}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors"
                                >
                                    <Avatar imagePath={auth.user.photo_profile} name={auth.user?.name} className="w-8 h-8" />
                                    <div className="hidden sm:block text-left">
                                        <p className="text-white text-sm font-medium leading-none">{auth.user?.name}</p>
                                        <p className="text-blue-200 text-xs mt-0.5">
                                            {auth.user?.roles?.[0]?.name ?? "-"}
                                        </p>
                                    </div>
                                    <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-blue-200 text-xs ml-1`} />
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900">{auth.user?.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{auth.user?.email}</p>
                                        </div>
                                        {/* <ResponsiveNavLink href={route("profile.edit")}>
                                            Profil Saya
                                        </ResponsiveNavLink> */}
                                        <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                            {t("logout")}
                                        </ResponsiveNavLink>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu toggle */}
                            <button
                                className="md:hidden p-2 rounded-md text-blue-100 hover:bg-white/10"
                                onClick={() => setIsMobileOpen((p) => !p)}
                            >
                                <i className={`fas ${isMobileOpen ? "fa-times" : "fa-bars"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMobileOpen && (
                    <div className="md:hidden bg-[#1E40AF] px-4 pb-3 space-y-1">
                        {navMenus.map((menu) => {
                            const title = i18n.language === "en" ? menu.title_en : menu.title_id;
                            return (
                                <Link
                                    key={menu.id}
                                    href={menu.route ? route(menu.route) : "#"}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-blue-100 hover:bg-white/10 hover:text-white"
                                >
                                    <i className={`${menu.icon || "fa-solid fa-circle"} text-xs`} />
                                    {title}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {children}
            </main>
        </div>
    );
}
