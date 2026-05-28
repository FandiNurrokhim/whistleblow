import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const languages = [
    { code: "en", label: "English", flag: "https://flagsapi.com/GB/flat/32.png" },
    { code: "id", label: "Bahasa", flag: "https://flagsapi.com/ID/flat/32.png" },
];

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
        setIsOpen(false);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) i18n.changeLanguage(savedLang);
    }, [i18n]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(v => !v)}
                className="flex items-center space-x-2 border rounded px-3 py-1 text-sm bg-white hover:bg-gray-100 focus:outline-none"
            >
                <img src={selected.flag} alt={selected.code} className="w-5 h-5" />
                <span className="hidden sm:inline">{selected.label}</span>
                <span className="sm:hidden uppercase">{selected.code}</span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <ul className="py-1">
                        {languages.map(lang => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${i18n.language === lang.code ? "font-semibold text-indigo-600" : "text-gray-700"
                                        }`}
                                >
                                    <img src={lang.flag} alt={lang.code} className="w-5 h-5 mr-2" />
                                    <span className="sm:inline">{lang.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown;