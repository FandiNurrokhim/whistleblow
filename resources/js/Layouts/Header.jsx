import { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import LanguageDropdown from "@/Components/Atoms/LanguageDropdown";
import { useTranslation } from "react-i18next";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Avatar from "@/Components/Molecules/Avatar";

import { Bars3Icon } from "@heroicons/react/24/solid";

const AppHeader = () => {
  const { t } = useTranslation();
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex items-center lg:justify-end justify-between bg-white shadow-sm px-4 py-3 border-b border-gray-200">

      <div className="lg:hidden">
        <button onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div className="flex items-center space-x-6">
        {/* <LanguageDropdown /> */}

        <div className="relative" ref={dropdownRef}>
          <button
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none rounded-md"
            id="user-menu-button"
          >
            <Avatar imagePath={auth.user.photo_profile} name={auth.user?.name} />
            <span className="text-gray-700 font-medium text-sm select-none">
              {auth?.user?.name}
            </span>
            <i
              className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"
                } text-gray-500 text-xs`}
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
                <p className="text-gray-900 font-semibold text-sm">
                  {auth?.user?.email}
                </p>
                {auth?.user?.roles && auth.user.roles.length > 0 ? (
                  <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 px-3 py-0.5 text-xs font-semibold mt-1">
                    {auth.user.roles[0].name}
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-gray-100 text-gray-400 px-3 py-0.5 text-xs font-semibold mt-1">
                    -
                  </span>
                )}
              </div>

              {/* <ResponsiveNavLink href={route("profile.edit")}>
                Profil
              </ResponsiveNavLink> */}
              <ResponsiveNavLink method="post" href={route("logout")} as="button">
                {t("logout")}
              </ResponsiveNavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
