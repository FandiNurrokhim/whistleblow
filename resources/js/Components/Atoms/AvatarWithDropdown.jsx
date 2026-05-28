import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Avatar from "@/Components/Molecules/Avatar";
import { t } from "i18next";

export default function AvatarDropdown({ className }) {
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!auth?.user) return null;

  return (
    <div className={`relative ${className || ""}`} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none rounded-md"
        id="user-menu-button"
      >
        <Avatar imagePath={auth.user.photo_profile} name={auth.user?.name} />
        <span className="text-white font-medium text-sm select-none">
          {auth.user.name}
        </span>
        <i
          className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-gray-500 text-xs`}
        ></i>
      </button>

      {isOpen && (
        <div
          aria-labelledby="user-menu-button"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          role="menu"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-gray-900 font-semibold text-sm">{auth.user.name}</p>
            <p className="text-gray-400 text-xs truncate">{auth.user.email}</p>
          </div>

          {auth.user.canAccessDashboard && (
            <ResponsiveNavLink href={route("admin.dashboard.index")}>
              Dashboard
            </ResponsiveNavLink>
          )}
          <ResponsiveNavLink href={route("profile.edit")}>
            {t("global.profile")}
          </ResponsiveNavLink>
          <ResponsiveNavLink href={route("home.getFavorites")}>
            {t("global.favorite")}
          </ResponsiveNavLink>
          <ResponsiveNavLink method="post" href={route("logout")} as="button">
            Logout
          </ResponsiveNavLink>
        </div>
      )}
    </div>
  );
}
