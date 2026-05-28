import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ApplicationLogo from '@/Components/ApplicationLogo';

import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { menus } = usePage().props;
  const { t, i18n } = useTranslation();

  // Group menus by header
  const groupedMenus = menus.reduce((acc, item) => {
    const header = item.header || "_no_header";
    if (!acc[header]) acc[header] = [];
    acc[header].push(item);
    return acc;
  }, {});


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };

    const handleToggleSidebar = () => setIsMobileOpen((prev) => !prev);

    window.addEventListener("resize", handleResize);
    window.addEventListener("toggle-sidebar", handleToggleSidebar);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, []);


  const renderMenuItem = (menu) => {
    const isActive = menu.is_active;
    const title = i18n.language === "en" ? menu.title_en : menu.title_id;

    return (
      <Link
        key={menu.id}
        href={menu.route ? route(menu.route) : "#"}
        className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white
        ${isMinimized ? "justify-center" : ""}
        ${isActive ? "bg-[#c19977] text-white" : ""}
      `}
      >
        <i className={`${menu.icon || "bx bx-circle"} text-lg`} />
        {!isMinimized && <span className="ml-4">{title}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`
          transition-all h-screen duration-300 text-gray-400 z-50
          ${isMobileOpen ? "fixed inset-0 bg-gray-900/90 backdrop-blur-md w-full h-full lg:hidden" : "hidden"}
          ${!isMobileOpen ? "lg:block relative" : ""}
          ${isMinimized && !isMobileOpen ? "w-16" : "w-64"}
          ${!isMobileOpen && "bg-gray-900 h-screen"}
        `}
      >
        {/* Close on Mobile */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={() => setIsMobileOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Toggle Minimize (Desktop) */}
        {!isMobileOpen && (
          <div
            className="absolute top-4 -right-3 z-10 hidden lg:flex bg-gray-800 p-1 rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <ChevronDoubleRightIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
        )}

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center lg:justify-start lg:px-4 justify-center w-full h-16 bg-gray-800">
            {isMinimized ? (
              <Link href="/home" className="flex items-center justify-center">
                <ApplicationLogo className="w-8 h-8 text-white" />
              </Link>
            ) : (
              <Link href="/home" className="flex items-center gap-2">
                <ApplicationLogo className="w-10 h-10 text-white" />
                {/* <span className="text-lg font-bold text-white"></span> */}
              </Link>
            )}
          </div>

          {/* Dynamic Menus */}
          <div className="flex flex-col mt-4 space-y-2 w-full px-2 overflow-y-auto">
            {Object.entries(groupedMenus).map(([header, items]) => (
              <div key={header} className="flex flex-col space-y-1">
                {header !== "_no_header" && !isMinimized && (
                  <div className="px-2 py-1 text-xs uppercase tracking-widest text-gray-500">{header}</div>
                )}
                {items.map((menu) => menu.type === "PARENT" && renderMenuItem(menu))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
