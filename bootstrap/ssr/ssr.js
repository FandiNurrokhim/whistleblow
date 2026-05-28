import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React, { useState as useState$1, useEffect as useEffect$1, useRef, forwardRef, useImperativeHandle, useMemo, Fragment as Fragment$1 } from "react";
import { Spinner, Breadcrumbs, Typography, Textarea, Button as Button$1, Drawer, IconButton } from "@material-tailwind/react";
import { usePage, Link, useForm, router, Head, createInertiaApp } from "@inertiajs/react";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronDownIcon, EyeSlashIcon, EyeIcon, XMarkIcon, PencilIcon, TrashIcon, CheckBadgeIcon, CubeIcon, UserGroupIcon, CheckIcon, AcademicCapIcon, UserIcon, BuildingOfficeIcon, MagnifyingGlassIcon, HeartIcon, ArrowRightStartOnRectangleIcon, ChatBubbleLeftRightIcon, HomeIcon, ArrowLeftOnRectangleIcon, KeyIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Bars3Icon, UserGroupIcon as UserGroupIcon$1, HeartIcon as HeartIcon$1, CheckCircleIcon } from "@heroicons/react/24/solid";
import Swal$1 from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import axios$1 from "axios";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import Select$1 from "react-select";
import { Country, State, City } from "country-state-city";
import { useKeenSlider } from "keen-slider/react.js";
import { motion } from "framer-motion";
import { t } from "i18next";
import { FaInstagram, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import ColorThief from "colorthief";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast, Bounce, ToastContainer } from "react-toastify";
import parse from "html-react-parser";
import Marquee from "react-fast-marquee";
import Slider from "rc-slider";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Logo = "/build/assets/Logo-CXOIOFmC.png";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: Logo,
      alt: "Logo",
      className: "w-10 h-10 rounded-full",
      ...props
    }
  );
}
function Sidebar() {
  const [isMinimized, setIsMinimized] = useState$1(false);
  const [isMobileOpen, setIsMobileOpen] = useState$1(false);
  const { menus } = usePage().props;
  const { t: t2, i18n } = useTranslation();
  const groupedMenus = menus.reduce((acc, item) => {
    const header = item.header || "_no_header";
    if (!acc[header]) acc[header] = [];
    acc[header].push(item);
    return acc;
  }, {});
  useEffect$1(() => {
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
    return /* @__PURE__ */ jsxs(
      Link,
      {
        href: menu.route ? route(menu.route) : "#",
        className: `flex items-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white
        ${isMinimized ? "justify-center" : ""}
        ${isActive ? "bg-[#c19977] text-white" : ""}
      `,
        children: [
          /* @__PURE__ */ jsx("i", { className: `${menu.icon || "bx bx-circle"} text-lg` }),
          !isMinimized && /* @__PURE__ */ jsx("span", { className: "ml-4", children: title })
        ]
      },
      menu.id
    );
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `
          transition-all h-screen duration-300 text-gray-400 z-50
          ${isMobileOpen ? "fixed inset-0 bg-gray-900/90 backdrop-blur-md w-full h-full lg:hidden" : "hidden"}
          ${!isMobileOpen ? "lg:block relative" : ""}
          ${isMinimized && !isMobileOpen ? "w-16" : "w-64"}
          ${!isMobileOpen && "bg-gray-900 h-screen"}
        `,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 lg:hidden", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsMobileOpen(false), children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }) }),
        !isMobileOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-4 -right-3 z-10 hidden lg:flex bg-gray-800 p-1 rounded-full cursor-pointer hover:bg-gray-700",
            onClick: () => setIsMinimized(!isMinimized),
            children: isMinimized ? /* @__PURE__ */ jsx(ChevronDoubleRightIcon, { className: "w-5 h-5 text-gray-400" }) : /* @__PURE__ */ jsx(ChevronDoubleLeftIcon, { className: "w-5 h-5 text-gray-400" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center lg:justify-start lg:px-4 justify-center w-full h-16 bg-gray-800", children: isMinimized ? /* @__PURE__ */ jsx(Link, { href: "/home", className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-8 h-8 text-white" }) }) : /* @__PURE__ */ jsx(Link, { href: "/home", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-10 h-10 text-white" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col mt-4 space-y-2 w-full px-2 overflow-y-auto", children: Object.entries(groupedMenus).map(([header, items]) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            header !== "_no_header" && !isMinimized && /* @__PURE__ */ jsx("div", { className: "px-2 py-1 text-xs uppercase tracking-widest text-gray-500", children: header }),
            items.map((menu) => menu.type === "PARENT" && renderMenuItem(menu))
          ] }, header)) })
        ] })
      ]
    }
  ) });
}
const languages = [
  { code: "en", label: "English", flag: "https://flagsapi.com/GB/flat/32.png" },
  { code: "id", label: "Bahasa", flag: "https://flagsapi.com/ID/flat/32.png" }
];
const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen2, setIsOpen] = useState$1(false);
  const dropdownRef = useRef();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setIsOpen(false);
  };
  useEffect$1(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);
  useEffect$1(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selected = languages.find((l) => l.code === i18n.language) || languages[0];
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-haspopup": "true",
        "aria-expanded": isOpen2,
        onClick: () => setIsOpen((v) => !v),
        className: "flex items-center space-x-2 border rounded px-3 py-1 text-sm bg-white hover:bg-gray-100 focus:outline-none",
        children: [
          /* @__PURE__ */ jsx("img", { src: selected.flag, alt: selected.code, className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: selected.label }),
          /* @__PURE__ */ jsx("span", { className: "sm:hidden uppercase", children: selected.code }),
          /* @__PURE__ */ jsx(ChevronDownIcon, { className: `w-4 h-4 ml-1 transition-transform ${isOpen2 ? "rotate-180" : ""}` })
        ]
      }
    ),
    isOpen2 && /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20", children: /* @__PURE__ */ jsx("ul", { className: "py-1", children: languages.map((lang) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => changeLanguage(lang.code),
        className: `flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${i18n.language === lang.code ? "font-semibold text-indigo-600" : "text-gray-700"}`,
        children: [
          /* @__PURE__ */ jsx("img", { src: lang.flag, alt: lang.code, className: "w-5 h-5 mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "sm:inline", children: lang.label })
        ]
      }
    ) }, lang.code)) }) })
  ] });
};
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
function getImageUrl(imagePath) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const parts = imagePath.split("/");
  const filename = encodeURIComponent(parts.pop());
  return `/storage/${parts.join("/")}/${filename}`;
}
const Avatar = ({
  imagePath,
  name,
  className = ""
}) => {
  const [imgError, setImgError] = useState$1(false);
  const initials = name ? name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase() : "";
  const finalImagePath = getImageUrl(imagePath);
  if (!finalImagePath || imgError) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-10 h-10 rounded-full bg-[#a5a6ff] flex items-center justify-center text-white font-bold text-lg ${className}`,
        title: name,
        children: initials
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: `w-10 h-10 rounded-full object-cover ${className}`,
        src: finalImagePath,
        alt: name,
        onError: () => setImgError(true)
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "absolute right-0 bottom-0 w-3.5 h-3.5 bg-[#4ADE80] border-2 border-white dark:border-[#fff] rounded-full" })
  ] });
};
const AppHeader = () => {
  var _a, _b, _c, _d;
  const { t: t2 } = useTranslation();
  const { auth } = usePage().props;
  const [isOpen2, setIsOpen] = useState$1(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect$1(() => {
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
  return /* @__PURE__ */ jsxs("header", { className: "w-full flex items-center lg:justify-end justify-between bg-white shadow-sm px-4 py-3 border-b border-gray-200", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx("button", { onClick: () => window.dispatchEvent(new CustomEvent("toggle-sidebar")), children: /* @__PURE__ */ jsx(Bars3Icon, { className: "h-6 w-6 text-gray-700" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          "aria-expanded": isOpen2,
          "aria-haspopup": "true",
          onClick: toggleDropdown,
          className: "flex items-center space-x-2 focus:outline-none rounded-md",
          id: "user-menu-button",
          children: [
            /* @__PURE__ */ jsx(Avatar, { imagePath: auth.user.photo_profile, name: (_a = auth.user) == null ? void 0 : _a.name }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium text-sm select-none", children: (_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.name }),
            /* @__PURE__ */ jsx(
              "i",
              {
                className: `fas ${isOpen2 ? "fa-chevron-up" : "fa-chevron-down"} text-gray-500 text-xs`
              }
            )
          ]
        }
      ),
      isOpen2 && /* @__PURE__ */ jsxs(
        "div",
        {
          "aria-labelledby": "user-menu-button",
          "aria-orientation": "vertical",
          className: "absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10",
          role: "menu",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-gray-100", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-semibold text-sm", children: (_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.email }),
              ((_d = auth == null ? void 0 : auth.user) == null ? void 0 : _d.roles) && auth.user.roles.length > 0 ? /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-indigo-100 text-indigo-700 px-3 py-0.5 text-xs font-semibold mt-1", children: auth.user.roles[0].name }) : /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-gray-100 text-gray-400 px-3 py-0.5 text-xs font-semibold mt-1", children: "-" })
            ] }),
            /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profil" }),
            /* @__PURE__ */ jsx(ResponsiveNavLink, { method: "post", href: route("logout"), as: "button", children: t2("logout") })
          ]
        }
      )
    ] }) })
  ] });
};
function AuthenticatedLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 left-0 z-30 h-screen w-auto", children: /* @__PURE__ */ jsx(Sidebar, {}) }),
    /* @__PURE__ */ jsxs("div", { id: "scrollableDiv", className: "flex-1 h-screen bg-slate-200 flex flex-col overflow-y-scroll", children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-20 w-full", children: /* @__PURE__ */ jsx(AppHeader, {}) }),
      /* @__PURE__ */ jsx("main", { className: "px-4 sm:px-6 py-5 lg:px-8 relative", children })
    ] })
  ] });
}
const PageHeader = ({ title, subtitle }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col mb-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: subtitle })
  ] });
};
function Checkbox({ className = "", onCheckedChange, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      onChange: (e) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, e);
        onCheckedChange == null ? void 0 : onCheckedChange(e.target.checked);
      },
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const ModalFooterActions = ({
  onCancel,
  processing = false
}) => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onCancel,
        className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300",
        children: t2("global.cancel")
      }
    ),
    /* @__PURE__ */ jsxs(PrimaryButton, { className: "ml-3 flex items-center justify-center", disabled: processing, children: [
      processing && /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsx(Spinner, { className: "h-4 w-4 animate-spin" }) }),
      processing ? t2("global.saving") : t2("global.save")
    ] })
  ] });
};
function Modal({
  children,
  show = false,
  type = "add",
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  },
  title,
  onSubmit,
  onCancel,
  processing,
  footer
}) {
  const { t: t2 } = useTranslation();
  const close2 = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close2,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxs(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b font-semibold text-lg sticky top-0 bg-white z-10", children: /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900", children: [
                    type === "add" ? t2("global.create") : t2("global.edit"),
                    " ",
                    title
                  ] }) }),
                  /* @__PURE__ */ jsxs("form", { onSubmit, children: [
                    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto scroll-smooth max-h-[calc(100vh-20rem)]  p-6 space-y-6", children }),
                    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t sticky bottom-0 bg-white z-10", children: /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t sticky bottom-0 bg-white z-10", children: footer ? footer : /* @__PURE__ */ jsx(
                      ModalFooterActions,
                      {
                        onCancel,
                        processing
                      }
                    ) }) })
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  ) });
}
function TableHeader({ columns, onSelectAll, isAllSelected, useSelectedDelete = true }) {
  return /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
    onSelectAll && useSelectedDelete && /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
      Checkbox,
      {
        checked: isAllSelected || false,
        onCheckedChange: (checked) => onSelectAll(!!checked)
      }
    ) }),
    onSelectAll && !useSelectedDelete && /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center", children: "No" }),
    columns.map((column, index) => {
      const autoCenter = typeof column.header === "string" && (column.header.toLowerCase().includes("aksi") || column.header.toLowerCase().includes("actions"));
      const headerClass = column.className || column.headerClassName || (autoCenter ? "text-center" : "");
      return /* @__PURE__ */ jsx("th", { className: `px-4 py-3 ${headerClass}`, children: column.header }, index);
    })
  ] }) });
}
function TableBody({ columns, data, selectedRows, onRowSelect, isProcessing, useSelectedDelete = true, currentPage = 1, perPage = 10 }) {
  const skeletonRows = Array.from({ length: 5 });
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx("tbody", { children: isProcessing ? skeletonRows.map((_, rowIndex) => /* @__PURE__ */ jsxs("tr", { className: "animate-pulse bg-white border-b border-gray-200", children: [
    onRowSelect && /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 bg-gray-200 rounded" }) }),
    columns.map((_2, colIndex) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full" }) }, colIndex))
  ] }, rowIndex)) : data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
    "td",
    {
      colSpan: columns.length + (onRowSelect ? 1 : 0),
      className: "py-10 text-center text-gray-800",
      children: t2("global.noDataFound")
    }
  ) }) : data.map((row, rowIndex) => /* @__PURE__ */ jsxs(
    "tr",
    {
      className: "bg-white border-b border-gray-200 hover:bg-gray-50",
      children: [
        onRowSelect && useSelectedDelete && /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: (selectedRows == null ? void 0 : selectedRows.has(row.id)) || false,
            onCheckedChange: (checked) => onRowSelect(row.id, !!checked)
          }
        ) }),
        onRowSelect && !useSelectedDelete && /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center", children: (currentPage - 1) * perPage + rowIndex + 1 }),
        columns.map((column, colIndex) => /* @__PURE__ */ jsx(
          "td",
          {
            className: `px-1 py-2 text-black ${column.className || ""}`,
            children: typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor]
          },
          colIndex
        ))
      ]
    },
    row.id
  )) });
}
const TableFooter = ({ currentPage, totalPages, onPageChange, isProcessing }) => {
  const { t: t2 } = useTranslation();
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onPageChange(i),
              className: `flex items-center justify-center text-sm py-2 px-3 leading-tight border ${i === currentPage ? "text-white bg-[#D9B36A] hover:bg-[#c49d4e] border-primary-300" : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"}`,
              children: i
            }
          ) }, i)
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-300", children: "..." }) }, `dots-${i}`)
        );
      }
    }
    return pages;
  };
  if (isProcessing) {
    return /* @__PURE__ */ jsxs(
      "nav",
      {
        className: "flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4",
        "aria-label": "Table navigation",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-800", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-32 bg-gray-200 rounded animate-pulse" }) }),
          /* @__PURE__ */ jsx("ul", { className: "inline-flex items-stretch -space-x-px", children: [...Array(5)].map((_, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded animate-pulse mx-1" }) }, idx)) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4",
      "aria-label": "Table navigation",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-normal text-gray-800", children: [
          t2("global.showing"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: currentPage }),
          " ",
          t2("global.of"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: totalPages })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "inline-flex items-stretch -space-x-px", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onPageChange(currentPage - 1),
              disabled: currentPage === 1,
              className: "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-800 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous" }),
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    clipRule: "evenodd"
                  }
                ) })
              ]
            }
          ) }),
          renderPageNumbers(),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onPageChange(currentPage + 1),
              disabled: currentPage === totalPages,
              className: "flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-800 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next" }),
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                    clipRule: "evenodd"
                  }
                ) })
              ]
            }
          ) })
        ] })
      ]
    }
  );
};
function TableToolbar({
  onSearch,
  onAdd,
  addButtonText = "Tambah Data",
  filters,
  onFilterChange,
  actions,
  selectedRows,
  onDeleteSelected,
  hideAddButton
}) {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "lg:flex md:flex flex-row gap-2 items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      onSearch && /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: t2("global.search") + "...",
          className: "border rounded px-2 py-1",
          onChange: (e) => onSearch(e.target.value)
        }
      ),
      filters && onFilterChange && /* @__PURE__ */ jsxs(
        "select",
        {
          className: "border rounded px-2 py-1",
          onChange: (e) => onFilterChange(e.target.value),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All" }),
            filters.map((filter, index) => /* @__PURE__ */ jsx("option", { value: filter, children: filter }, index))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: selectedRows.size > 0 ? /* @__PURE__ */ jsx(Fragment, { children: actions && Array.isArray(actions) && /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: actions.map((action, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => action.action(Array.from(selectedRows)),
        className: `inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${action.className}`,
        children: [
          action.icon,
          action.label
        ]
      },
      index
    )) }) }) : onAdd && !hideAddButton && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: onAdd,
        className: "mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-[#D9B36A] text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D9B36A] transition-all duration-300 ease-in-out hover:bg-[#c49d4e]",
        children: [
          t2("global.create"),
          " ",
          addButtonText
        ]
      }
    ) })
  ] });
}
function Table({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
  onAdd,
  onAddLink,
  addButtonText = "Tambah Data",
  filters,
  onFilterChange,
  selectable = false,
  onDeleteSelected,
  addType = "page",
  AddModalContent,
  isProcessing = false,
  useSelectedDelete = true,
  toolbarActions,
  perPage = 10,
  hideAddButton = false
}) {
  const [selectedRows, setSelectedRows] = useState$1(/* @__PURE__ */ new Set());
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const [debouncedSearch, setDebouncedSearch] = useState$1("");
  const [searchQuery, setSearchQuery] = useState$1("");
  const tableScrollRef = useRef(null);
  useEffect$1(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);
  useEffect$1(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  useEffect$1(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allIds = new Set(data.map((row) => row.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(/* @__PURE__ */ new Set());
    }
  };
  useEffect$1(() => {
    if (isProcessing) {
      setSelectedRows(/* @__PURE__ */ new Set());
    }
  }, [isProcessing]);
  const handleRowSelect = (rowId, isSelected) => {
    const newSelectedRows = new Set(selectedRows);
    if (isSelected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    setSelectedRows(newSelectedRows);
  };
  const handleAdd = () => {
    if (addType === "modal") {
      onAdd();
    } else if (addType === "page" && onAddLink) {
      window.location.href = onAddLink;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container h-full", children: [
    /* @__PURE__ */ jsx(
      TableToolbar,
      {
        onSearch: (query) => setSearchQuery(query),
        onAdd: handleAdd,
        addButtonText,
        filters,
        onFilterChange,
        selectedRows,
        actions: toolbarActions,
        onDeleteSelected: useSelectedDelete ? onDeleteSelected : void 0,
        hideAddButton
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400", children: [
      /* @__PURE__ */ jsx(
        TableHeader,
        {
          columns,
          onSelectAll: selectable ? handleSelectAll : void 0,
          isAllSelected: data.length > 0 && selectedRows.size === data.length,
          useSelectedDelete
        }
      ),
      /* @__PURE__ */ jsx(
        TableBody,
        {
          columns,
          data,
          selectedRows: selectable ? selectedRows : void 0,
          onRowSelect: selectable ? handleRowSelect : void 0,
          isProcessing,
          useSelectedDelete,
          currentPage,
          perPage
        }
      )
    ] }) }),
    currentPage !== void 0 && totalPages !== void 0 && onPageChange && /* @__PURE__ */ jsx(
      TableFooter,
      {
        currentPage,
        totalPages,
        onPageChange,
        isProcessing
      }
    ),
    addType === "modal" && AddModalContent && /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: () => setIsModalOpen(false), children: /* @__PURE__ */ jsx(AddModalContent, { onClose: () => setIsModalOpen(false) }) })
  ] });
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const ConfirmDeleteModal = ({
  isOpen: isOpen2,
  onClose,
  onDelete,
  title = "Are you sure?",
  description = "Once deleted, this action cannot be undone.",
  deleteButtonText = "Delete",
  isProcessing = false
}) => {
  const { t: t2 } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete();
  };
  return /* @__PURE__ */ jsx(Transition, { show: isOpen2, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-ful max-w-2xl`,
                children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: description }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
                    /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, children: t2("global.cancel") }),
                    /* @__PURE__ */ jsx(DangerButton, { className: "ml-3", disabled: isProcessing, children: isProcessing ? t2("global.processing") : deleteButtonText })
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  ) });
};
function InputLabel({
  value,
  className = "",
  children,
  required = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-700 ` + className,
      children: [
        value ? value : children,
        required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-1", children: "*" })
      ]
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const localRef = useRef(null);
  const [showPassword, setShowPassword] = useState$1(false);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect$1(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type: inputType,
        className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className + (isPassword ? " pr-10" : ""),
        ref: localRef
      }
    ),
    isPassword && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        tabIndex: -1,
        className: "absolute inset-y-0 right-0 flex items-center px-2 text-gray-500",
        onClick: () => setShowPassword((v) => !v),
        children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5" })
      }
    )
  ] });
});
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
const UploadInputWithPreview = ({
  id,
  name,
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
  value,
  onChange,
  error,
  required = false,
  maxSizeMB = 1
}) => {
  const { t: t2 } = useTranslation();
  const inputRef = useRef();
  const [sizeError, setSizeError] = useState$1("");
  const formatSize = (sizeMB) => {
    return sizeMB >= 1 ? `${sizeMB.toFixed(1)} MB` : `${(sizeMB * 1024).toFixed(0)} KB`;
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > maxSizeMB * 1024 * 1024) {
      const formattedSize = formatSize(maxSizeMB);
      setSizeError(`${label} ${t2("global.maxSizeError", { max: formattedSize })}`);
      if (inputRef.current) inputRef.current.value = "";
      if (onChange) onChange({ target: { name, files: [] } });
      return;
    }
    setSizeError("");
    if (onChange) onChange(e);
  };
  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (onChange) {
      onChange({ target: { name, files: [] } });
    }
  };
  const handlePreview = () => {
    let fileUrl = `/${value.replace(/^\/+/, "")}`;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "block text-sm mb-1", children: [
      t2("global.upload"),
      " ",
      label,
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500 ml-1", children: [
        "(",
        accept,
        ") ",
        required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-1", children: "*" })
      ] })
    ] }),
    !value ? /* @__PURE__ */ jsxs(
      "label",
      {
        className: "relative flex items-center w-full border border-gray-200 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600 cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center mr-2", children: /* @__PURE__ */ jsx("img", { src: "/assets/icons/upload.svg", alt: "PDF Icon", className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "font-medium text-gray-500 bg-gray-300 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer",
              children: t2("global.chooseFile")
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              id,
              name,
              type: "file",
              accept,
              onChange: handleFileChange,
              required: required && !value,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-4 text-xs text-gray-400 select-none pointer-events-none", children: t2("global.noFileSelected") })
        ]
      }
    ) : /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center border border-gray-300 rounded-md p-2 text-xs text-green-600",
        role: "alert",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center mr-2", children: /* @__PURE__ */ jsx("img", { src: "/assets/icons/upload.svg", alt: "PDF Icon", className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex-1", children: t2("global.fileUploaded") }),
          typeof value === "string" && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "View uploaded file",
              className: "text-gray-700 hover:text-gray-900 focus:outline-none",
              onClick: handlePreview,
              children: /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5 inline" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-red-600 hover:text-red-800 ml-2",
              title: "Hapus file",
              onClick: handleRemove,
              children: /* @__PURE__ */ jsx(XMarkIcon, { className: "h-5 w-5 inline" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        id: `hidden_${id}`,
        name,
        type: "file",
        accept,
        onChange: handleFileChange,
        required: required && !value,
        className: "hidden"
      }
    ),
    (error || sizeError) && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm mt-1", children: error || sizeError })
  ] });
};
function getInertiaErrorMessage(error, lang = "id") {
  if (!error) return "";
  try {
    const parsed = JSON.parse(error);
    return parsed[lang] || parsed.id || parsed.en || error;
  } catch (e) {
    return error;
  }
}
const getErrorMessage = (error, t2, locale = "id") => {
  var _a, _b, _c, _d;
  return typeof ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) === "object" ? error.response.data.message[t2("global.locale", locale)] || error.response.data.message.id || error.response.data.message.en || t2("global.anErrorOccurred", "An error occurred.") : ((_d = (_c = error == null ? void 0 : error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || t2("global.anErrorOccurred", "An error occurred.");
};
const CreateModal$4 = ({ isOpen: isOpen2, onClose, setRefetch }) => {
  var _a;
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    nim: "",
    nip: "",
    class_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    image: null,
    message: ""
  });
  const roles = usePage().props.roles;
  const selectedRole2 = (_a = roles.find((r) => r.id === data.role)) == null ? void 0 : _a.name;
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/user", {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil dibuat"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("global.user"),
      type: "add",
      maxWidth: "5xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.accountData") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name"), required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  name: "name",
                  value: data.name,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  required: true,
                  autoComplete: "name",
                  placeholder: t2("global.name")
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "role", value: t2("role.pageTitle"), required: true }),
              /* @__PURE__ */ jsx(
                Select$1,
                {
                  options: (roles == null ? void 0 : roles.map((role) => ({
                    value: role.id,
                    label: role.name
                  }))) || [],
                  id: "role",
                  name: "role",
                  value: (roles == null ? void 0 : roles.map((role) => ({
                    value: role.id,
                    label: role.name
                  })).find((option) => option.value === data.role)) || null,
                  onChange: (selectedOption) => setData("role", selectedOption ? selectedOption.value : ""),
                  placeholder: t2("role.pageTitle"),
                  isClearable: true,
                  menuPlacement: "auto",
                  menuShouldScrollIntoView: false,
                  className: "mt-1 block w-full",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.role, className: "mt-2" })
            ] }),
            selectedRole2 === "Dosen" || /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nip", value: "NIp", required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "nip",
                  type: "number",
                  name: "nip",
                  value: data.nim,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  required: true,
                  autoComplete: "nip",
                  placeholder: "nip"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.nip, className: "mt-2" })
            ] }),
            selectedRole2 === "Mahasiswa" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIM", required: true }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "nim",
                    type: "number",
                    name: "nim",
                    value: data.nim,
                    onChange: handleChange,
                    className: "mt-1 block w-full",
                    required: true,
                    autoComplete: "nim",
                    placeholder: "nim"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.nim, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "class_name", value: "Kelas" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "class_name",
                    name: "class_name",
                    value: data.class_name,
                    onChange: handleChange,
                    className: "mt-1 block w-full"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.class_name })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t2("global.email"), required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "email",
                  name: "email",
                  value: data.email || "",
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  required: true,
                  autoComplete: "email",
                  type: "email",
                  placeholder: t2("global.email")
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t2("global.password"), required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password",
                  name: "password",
                  value: data.password || "",
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
                  type: "password",
                  placeholder: t2("global.password"),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.personalData") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: t2("global.phone") }),
              /* @__PURE__ */ jsx(
                PhoneInput,
                {
                  country: "id",
                  value: data.phone,
                  onChange: (phone) => setData("phone", phone),
                  inputClass: "!rounded-md !border-gray-300 !shadow-sm focus:!border-indigo-500 focus:!ring-indigo-500 !w-full !pl-12 !pr-3 py-2",
                  buttonClass: "!bg-white !border-r !border-gray-300 !rounded-l-md",
                  containerClass: "!w-full"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "address", value: t2("global.address") }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "address",
                  name: "address",
                  value: data.address || "",
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "address",
                  placeholder: t2("global.address")
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.photoProfile") }),
          /* @__PURE__ */ jsx(
            UploadInputWithPreview,
            {
              id: "image",
              name: "image",
              label: t2("global.image"),
              accept: ".jpg,.jpeg,.png",
              maxSizeMB: 0.5,
              onChange: (e) => setData("image", e.target.files[0]),
              value: data.image,
              error: errors.image
            }
          )
        ] })
      ]
    }
  );
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateModal$4
}, Symbol.toStringTag, { value: "Module" }));
const EditModal$3 = ({
  isOpen: isOpen2,
  onClose,
  user,
  setRefetch
}) => {
  var _a, _b, _c, _d, _e;
  if (!user) return null;
  const { t: t2, i18n } = useTranslation();
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    nim: ((_a = user.student) == null ? void 0 : _a.nim) || "",
    nip: ((_b = user.lecturer) == null ? void 0 : _b.nip) || "",
    class_name: ((_c = user.student) == null ? void 0 : _c.class_name) || "",
    password: "",
    phone: user.phone || "",
    address: user.address || "",
    country: user.country || "",
    state: user.state || "",
    city: user.city || "",
    role: ((_e = (_d = user.roles) == null ? void 0 : _d[0]) == null ? void 0 : _e.id) || "",
    image: null,
    message: ""
  });
  const roles = usePage().props.roles;
  useMemo(
    () => Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name
    })),
    []
  );
  useMemo(
    () => data.country ? State.getStatesOfCountry(data.country).map((s) => ({
      value: s.isoCode,
      label: s.name
    })) : [],
    [data.country]
  );
  useMemo(
    () => data.country && data.state ? City.getCitiesOfState(data.country, data.state).map((c) => ({
      value: c.name,
      label: c.name
    })) : [],
    [data.country, data.state]
  );
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...data };
    if (!data.password || data.password.trim() === "") {
      delete submitData.password;
    }
    router.post(`/admin/user/${user.id}`, {
      ...submitData,
      _method: "put"
    }, {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil diubah"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("global.user"),
      type: "edit",
      maxWidth: "5xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.accountData") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name"), required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  name: "name",
                  value: data.name,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "name",
                  placeholder: t2("global.name"),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "role", value: t2("role.pageTitle"), required: true }),
              /* @__PURE__ */ jsx(
                Select$1,
                {
                  options: (roles == null ? void 0 : roles.map((role) => ({
                    value: role.id,
                    label: role.name
                  }))) || [],
                  id: "role",
                  name: "role",
                  value: (roles == null ? void 0 : roles.map((role) => ({
                    value: role.id,
                    label: role.name
                  })).find((option) => option.label === data.role)) || null,
                  onChange: (selectedOption) => setData("role", selectedOption ? selectedOption.label : ""),
                  placeholder: t2("role.pageTitle"),
                  isClearable: true,
                  menuPlacement: "auto",
                  menuShouldScrollIntoView: false,
                  className: "mt-1 block w-full h-full",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.role, className: "mt-2" })
            ] }),
            selectedRole === "Dosen" || /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nip", value: "NIp", required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "nip",
                  type: "number",
                  name: "nip",
                  value: data.nim,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  required: true,
                  autoComplete: "nip",
                  placeholder: "nip"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.nip, className: "mt-2" })
            ] }),
            selectedRole === "Mahasiswa" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIM", required: true }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "nim",
                    type: "number",
                    name: "nim",
                    value: data.nim,
                    onChange: handleChange,
                    className: "mt-1 block w-full",
                    required: true,
                    autoComplete: "nim",
                    placeholder: "nim"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.nim, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "class_name", value: "Kelas" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "class_name",
                    name: "class_name",
                    value: data.class_name,
                    onChange: handleChange,
                    className: "mt-1 block w-full"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.class_name })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t2("global.email"), required: true }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "email",
                  name: "email",
                  value: data.email,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "email",
                  type: "email",
                  placeholder: t2("global.email"),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t2("global.password") }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password",
                  name: "password",
                  value: data.password,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
                  type: "password",
                  placeholder: t2("global.password")
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.personalData") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: t2("global.phone") }),
              /* @__PURE__ */ jsx(
                PhoneInput,
                {
                  country: "id",
                  value: data.phone,
                  onChange: (phone) => setData("phone", phone),
                  inputClass: "!rounded-md !border-gray-300 !shadow-sm focus:!border-indigo-500 focus:!ring-indigo-500 !w-full !pl-12 !pr-3 py-2",
                  buttonClass: "!bg-white !border-r !border-gray-300 !rounded-l-md",
                  containerClass: "!w-full !mt-1"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "address", value: t2("global.address") }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "address",
                  name: "address",
                  value: data.address,
                  onChange: handleChange,
                  className: "mt-1 block w-full",
                  autoComplete: "address",
                  placeholder: t2("global.address")
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.photoProfile") }),
          /* @__PURE__ */ jsx(
            UploadInputWithPreview,
            {
              id: "image",
              name: "image",
              label: t2("global.image"),
              accept: ".jpg,.jpeg,.png",
              maxSizeMB: 0.5,
              onChange: (e) => setData("image", e.target.files[0]),
              value: data.image,
              error: errors.image
            }
          )
        ] })
      ]
    }
  );
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditModal$3
}, Symbol.toStringTag, { value: "Module" }));
function Card({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `rounded-2xl border border-gray-200 bg-white p-5 ${className}`,
      ...props,
      children
    }
  );
}
const ConfirmModal = ({
  isOpen: isOpen2,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmButtonText = "Confirm",
  icon = null,
  buttonClassName = "bg-blue-600 hover:bg-blue-700 text-white",
  isProcessing = false,
  children = null
}) => {
  const { t: t2 } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };
  return /* @__PURE__ */ jsx(Transition, { show: isOpen2, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full max-w-md`,
                children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
                  icon && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: icon }),
                  /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-center text-gray-900", children: title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-center text-gray-600", children: description }),
                  children && /* @__PURE__ */ jsx("div", { children }),
                  /* @__PURE__ */ jsxs("div", { className: `flex gap-3 ${children ? "mt-6" : "mt-6"} justify-center`, children: [
                    /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, disabled: isProcessing, children: t2("global.cancel") }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        disabled: isProcessing,
                        className: `px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`,
                        children: isProcessing ? t2("global.processing") : confirmButtonText
                      }
                    )
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  ) });
};
const getCountryFlagUrl = (code) => {
  if (!code) return "";
  return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
};
const getCountryName = (code) => {
  if (!code) return "-";
  const country = Country.getCountryByCode(code);
  return country ? country.name : code;
};
const getStateName = (countryCode, stateCode) => {
  if (!countryCode || !stateCode) return "-";
  const state = State.getStateByCodeAndCountry(stateCode, countryCode);
  return state ? state.name : stateCode;
};
const UserTable = () => {
  const { t: t2, i18n } = useTranslation();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState$1(false);
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isEditModalOpen, setIsEditModalOpen] = useState$1(false);
  const [selectedUser, setSelectedUser] = useState$1(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState$1(false);
  const [selectedUserId, setSelectedUserId] = useState$1(null);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState$1(false);
  const [selectedIds, setSelectedIds] = useState$1([]);
  const [isProcessing, setIsProcessing] = useState$1(false);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const openEditModal = (user) => {
    axios$1.get(`/admin/user/${user.id}`).then((response) => {
      setSelectedUser(response.data.user);
      setIsEditModalOpen(true);
    }).catch((error) => {
      var _a, _b;
      setIsProcessing(false);
      const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred.";
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setIsDeleteModalOpen(false);
  };
  const handleApproveSelected = (ids) => {
    setSelectedIds(ids);
    setIsApproveModalOpen(true);
  };
  const confirmApproveSelected = () => {
    setIsProcessing(true);
    axios$1.post(route("admin.user.bulk-approve"), { ids: selectedIds }).then(() => {
      setIsProcessing(false);
      setIsApproveModalOpen(false);
      Swal$1.fire(
        t2("Sukses"),
        "Akun Mahasiswa berhasil diaktifkan",
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleDelete = () => {
    setIsProcessing(true);
    axios$1.delete(`/admin/user/${selectedUserId}`).then(() => {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
      Swal$1.fire(
        t2("Deleted!"),
        t2("Pengguna berhasil dihapus"),
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleDeleteSelected = (ids) => {
    setSelectedIds(ids);
    setIsDeleteSelectedModalOpen(true);
  };
  const confirmDeleteSelected = () => {
    setIsProcessing(true);
    axios$1.post(route("admin.user.bulk-delete"), { ids: selectedIds }).then(() => {
      setIsProcessing(false);
      setIsDeleteSelectedModalOpen(false);
      Swal$1.fire("Berhasil!", "Data terpilih berhasil dihapus", "success");
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/user/data", {
      params: {
        page: currentPage,
        search
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch]);
  const toolbarActions = [
    {
      label: "Approve",
      icon: /* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-5 h-5" }),
      action: handleApproveSelected,
      className: "bg-blue-600 hover:bg-blue-700 text-white"
    }
  ];
  const columns = [
    {
      header: t2("global.name"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Avatar, { imagePath: row.photo_profile, name: row.name, className: "inline-block relative object-cover object-center !rounded-full w-12 h-12" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h6", { className: "text-slate-800 font-semibold", children: row.name || "-" }),
          /* @__PURE__ */ jsx("p", { className: "inline-block rounded bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-semibold", children: row.roles && row.roles.length > 0 ? row.roles[0].name : "-" })
        ] })
      ] })
    },
    { header: t2("global.email"), accessor: (row) => row.email || "-", className: "font-semibold" },
    { header: t2("global.phone"), accessor: (row) => row.phone || "-" },
    {
      header: t2("global.country"),
      accessor: (row) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        row.country && /* @__PURE__ */ jsx(
          "img",
          {
            src: getCountryFlagUrl(row.country),
            alt: row.country,
            className: "inline-block w-5 h-4 object-cover rounded-sm"
          }
        ),
        getCountryName(row.country)
      ] })
    },
    { header: t2("global.state"), accessor: (row) => getStateName(row.country, row.state), className: "font-semibold text-center" },
    { header: t2("global.city"), accessor: (row) => row.city || "-", className: "font-semibold text-center" },
    { header: t2("global.address"), accessor: (row) => row.address || "-" },
    {
      header: "Status Akun",
      accessor: (row) => {
        const active = Boolean(row.is_approved);
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
            children: active ? "Approved" : "Belum Aktif"
          }
        );
      }
    },
    {
      header: t2("global.actions"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => openEditModal(row),
            className: "inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700",
            children: [
              /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: t2("global.edit", "Edit") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(DangerButton, { onClick: () => openDeleteModal(row.id), children: [
          /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5 me-2 rounded-full bg-red-400 p-1 text-white" }),
          " ",
          /* @__PURE__ */ jsx("span", { children: t2("global.delete", "Hapus") })
        ] })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data,
        currentPage,
        totalPages,
        onSearch: handleSearch,
        onPageChange: (page) => setCurrentPage(page),
        onAdd: () => setIsModalOpen(true),
        addType: "modal",
        addButtonText: t2("global.user", "User"),
        AddModalContent: CreateModal$4,
        selectable: true,
        onDeleteSelected: handleDeleteSelected,
        toolbarActions,
        isProcessing: isLoading
      }
    ),
    /* @__PURE__ */ jsx(CreateModal$4, { isOpen: isModalOpen, onClose: toggleModal, setRefetch }),
    /* @__PURE__ */ jsx(
      EditModal$3,
      {
        isOpen: isEditModalOpen,
        onClose: closeEditModal,
        user: selectedUser,
        setRefetch
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDeleteModal,
      {
        isOpen: isDeleteModalOpen,
        onClose: closeDeleteModal,
        onDelete: handleDelete,
        title: t2("user.deleteTitle", "Delete User"),
        description: t2("user.deleteDescription", "Are you sure you want to delete this user? This action cannot be undone."),
        deleteButtonText: t2("user.deleteTitle", "Delete User"),
        isProcessing
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDeleteModal,
      {
        isOpen: isDeleteSelectedModalOpen,
        onClose: () => setIsDeleteSelectedModalOpen(false),
        onDelete: confirmDeleteSelected,
        title: t2("user.deleteSelectedTitle", "Delete Selected Users"),
        description: t2("user.deleteSelectedDescription", "Are you sure you want to delete the selected users? This action cannot be undone."),
        deleteButtonText: t2("user.deleteSelectedButton", "Delete Selected"),
        isProcessing
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        isOpen: isApproveModalOpen,
        onClose: () => setIsApproveModalOpen(false),
        onConfirm: confirmApproveSelected,
        title: "Approve Data",
        description: `Approve ${selectedIds.length} data terpilih?`,
        confirmButtonText: "Approve",
        buttonClassName: "bg-blue-600 hover:bg-blue-700 text-white",
        icon: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(CheckBadgeIcon, { className: "w-5 h-5" }) }),
        isProcessing
      }
    )
  ] });
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserTable
}, Symbol.toStringTag, { value: "Module" }));
const TitleCard = ({
  header,
  description,
  gradient = "bg-[radial-gradient(108.23%_101.56%_at_73.48%_0%,_#DFD0B8_0%,_#675A48_100%)]"
}) => {
  return /* @__PURE__ */ jsxs(Card, { className: `w-full ${gradient}`, children: [
    /* @__PURE__ */ jsx("h1", { className: "text-lg font-[700] mb-2 text-[white]", children: header }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-[#F9FCFF] font-normal", children: description })
  ] });
};
const StatCard = ({
  label = "Total Data",
  value = 401,
  icon: Icon = CubeIcon
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-xl shadow p-6 w-full overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 flex items-center justify-center bg-[#E7E3DE] rounded-md", children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-[#8B7E6B]" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-black", children: value })
    ] }),
    /* @__PURE__ */ jsx(
      Icon,
      {
        size: 140,
        className: "absolute right-0 bottom-[-20px] text-gray-200 opacity-40 pointer-events-none"
      }
    )
  ] });
};
const UserPage$1 = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Dashboard Admin",
        subtitle: ""
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx(Link, { href: "dashboard", className: "opacity-60 hover:opacity-100", children: "Dashboard" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(
        TitleCard,
        {
          header: "Selamat Datang Admin",
          description: ""
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Data Dosen`,
          value: usePage().props.lecturer_count || "0",
          icon: UserGroupIcon
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Data Mahasiswa`,
          value: usePage().props.student_count || "0",
          icon: UserGroupIcon
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Data Prodi`,
          value: usePage().props.study_program_count || "0",
          icon: UserGroupIcon
        }
      )
    ] })
  ] }) });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserPage$1
}, Symbol.toStringTag, { value: "Module" }));
const LecturerTable$1 = () => {
  const { t: t2, i18n } = useTranslation();
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [selectedIds, setSelectedIds] = useState$1([]);
  const [isProcessing, setIsProcessing] = useState$1(false);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState$1(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState$1(false);
  const [rejectionReason, setRejectionReason] = useState$1("");
  const handleConfirmSelected = (ids) => {
    setSelectedIds(ids);
    setIsConfirmModalOpen(true);
  };
  const handleRejectSelected = (ids) => {
    setSelectedIds(ids);
    setIsRejectModalOpen(true);
  };
  const confirmAction = (action) => {
    setIsProcessing(true);
    const endpoint = action === "confirm" ? route("admin.dashboard.lecturer.bulk-confirm") : route("admin.dashboard.lecturer.bulk-reject");
    const payload = action === "reject" ? { ids: selectedIds, reason: rejectionReason } : { ids: selectedIds };
    axios$1.post(endpoint, payload).then(() => {
      setIsProcessing(false);
      setIsConfirmModalOpen(false);
      setIsRejectModalOpen(false);
      setSelectedIds([]);
      setRejectionReason("");
      const message = action === "confirm" ? "Data yang terpilih berhasil dikonfirmasi." : "Data yang terpilih berhasil ditolak.";
      Swal$1.fire(
        t2("global.success", "Success!"),
        message,
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/dashboard/lecturer/requests", {
      params: {
        page: currentPage,
        search
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch]);
  const columns = [
    {
      header: "NIM",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.nim) || "-";
      }
    },
    {
      header: "Nama Mahasiswa",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.name) || "-";
      }
    },
    {
      header: "Prodi",
      className: "text-center",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.study_program) ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-white p-2 bg-slate-400 rounded-md", children: [
          row.submission.student.study_program.code,
          " - ",
          row.submission.student.study_program.name
        ] }) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "-" });
      }
    },
    {
      header: "Judul Skripsi",
      accessor: (row) => {
        var _a, _b;
        return /* @__PURE__ */ jsx("div", { className: "max-w-xs truncate", title: ((_a = row.submission) == null ? void 0 : _a.title) || "-", children: ((_b = row.submission) == null ? void 0 : _b.title) || "-" });
      }
    },
    {
      header: "Peran",
      className: "text-center",
      accessor: (row) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: `text-white px-3 py-1 rounded-full text-xs font-semibold ${row.role === "primary" ? "bg-blue-500" : "bg-purple-500"}`, children: row.role === "primary" ? "Pembimbing Utama" : "Pembimbing Sekunder" }) })
    },
    {
      header: "Diminta Pada",
      className: "text-center",
      accessor: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    },
    {
      header: t2("global.actions"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleConfirmSelected([row.id]),
            className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold\n                text-white bg-green-600 hover:bg-green-700 rounded-md transition",
            children: [
              /* @__PURE__ */ jsx(CheckIcon, { className: "w-4 h-4" }),
              "Setujui"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleRejectSelected([row.id]),
            className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold\n                text-white bg-red-600 hover:bg-red-700 rounded-md transition",
            children: [
              /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" }),
              "Tolak"
            ]
          }
        )
      ] })
    }
  ];
  const toolbarActions = [
    {
      label: "Terima",
      icon: /* @__PURE__ */ jsx(CheckIcon, { className: "w-5 h-5" }),
      action: handleConfirmSelected,
      className: "bg-green-600 hover:bg-green-700 text-white"
    },
    {
      label: "Tolak",
      icon: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" }),
      action: handleRejectSelected,
      className: "bg-red-600 hover:bg-red-700 text-white"
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data,
        currentPage,
        totalPages,
        onSearch: handleSearch,
        onPageChange: (page) => setCurrentPage(page),
        selectable: true,
        isProcessing: isLoading,
        toolbarActions,
        hideAddButton: true
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        isOpen: isConfirmModalOpen,
        onClose: () => setIsConfirmModalOpen(false),
        onConfirm: () => confirmAction("confirm"),
        title: "Konfirmasi Data",
        description: `Apakah Anda yakin ingin mengkonfirmasi ${selectedIds.length} data terpilih?`,
        confirmButtonText: "Terima",
        buttonClassName: "bg-green-600 hover:bg-green-700 text-white",
        icon: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full", children: /* @__PURE__ */ jsx(CheckIcon, { className: "w-5 h-5" }) }),
        isProcessing
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        isOpen: isRejectModalOpen,
        onClose: () => {
          setIsRejectModalOpen(false);
          setRejectionReason("");
        },
        onConfirm: () => confirmAction("reject"),
        title: "Tolak Data",
        description: `Apakah Anda yakin ingin menolak ${selectedIds.length} data terpilih?`,
        confirmButtonText: "Tolak",
        buttonClassName: "bg-red-600 hover:bg-red-700 text-white",
        icon: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full", children: [
          /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" }),
          ","
        ] }),
        isProcessing,
        children: /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Alasan Penolakan" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: rejectionReason,
              onChange: (e) => setRejectionReason(e.target.value),
              placeholder: "Masukkan alasan penolakan (opsional)",
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none",
              rows: "3",
              disabled: isProcessing
            }
          )
        ] })
      }
    )
  ] });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LecturerTable$1
}, Symbol.toStringTag, { value: "Module" }));
const DashboardLecturer = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Master Mahasiswa",
        subtitle: "Kelola akun dosen dalam sistem"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx("span", { children: "Mahasiswa" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(
      TitleCard,
      {
        header: "Dashboard Dosen",
        description: "Anda dapat Menerima atau Menolak permintaan menjadi pembimbing Mahasiswa"
      }
    ) }),
    /* @__PURE__ */ jsx(LecturerTable$1, {})
  ] }) });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardLecturer
}, Symbol.toStringTag, { value: "Module" }));
const CreateModal$3 = ({ isOpen: isOpen2, onClose, setRefetch }) => {
  var _a, _b;
  const { auth } = usePage().props;
  const [primarySupervisors, setPrimarySupervisors] = useState$1([]);
  const [secondarySupervisors, setSecondarySupervisors] = useState$1([]);
  const [lockedPrimary, setLockedPrimary] = useState$1(null);
  const [lockedSecondary, setLockedSecondary] = useState$1(null);
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    primary_supervisor_id: "",
    secondary_supervisor_id: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/student/thesis-submission/${auth.user.student.id}`, {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil dibuat"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  useEffect$1(() => {
    if (!isOpen2) return;
    const loadSupervisorLock = async () => {
      try {
        const res = await fetch(
          `/student/${auth.user.student.id}/supervisor-lock`
        );
        const json = await res.json();
        const {
          status,
          thesis_title,
          locked_primary,
          locked_secondary
        } = json.data;
        if (status === "fully_approved") {
          Swal$1.fire({
            icon: "info",
            title: "Skripsi Sudah Disetujui",
            text: "Pengajuan skripsi Anda sudah fully approved dan tidak dapat diajukan ulang."
          });
          onClose();
          return;
        }
        if (status === "waiting_supervisor") {
          Swal$1.fire({
            icon: "warning",
            title: "Pengajuan Masih Diproses",
            text: "Pengajuan skripsi sebelumnya masih menunggu persetujuan dosen pembimbing."
          });
          onClose();
          return;
        }
        setLockedPrimary(locked_primary);
        setLockedSecondary(locked_secondary);
        if (thesis_title) {
          setData("title", thesis_title);
        }
        if (locked_primary) {
          setData("primary_supervisor_id", locked_primary.id);
        }
        if (locked_secondary) {
          setData("secondary_supervisor_id", locked_secondary.id);
        }
        fetch("/lecturer/primary-supervisor/select-data").then((res2) => res2.json()).then((result) => {
          setPrimarySupervisors(result.data.primarySupervisor || []);
        });
        fetch("/lecturer/secondary-supervisor/select-data").then((res2) => res2.json()).then((result) => {
          setSecondarySupervisors(result.data.secondarySupervisor || []);
        });
      } catch (e) {
        Swal$1.fire("Error!", "Gagal memuat data", "error");
      }
    };
    loadSupervisorLock();
  }, [isOpen2]);
  const primarySupervisorOptions = primarySupervisors.map((primary) => ({
    value: primary.id,
    label: `${primary.name} - ${primary.nip} (Sisa kuota: ${primary.remaining_quota})`
  }));
  const secondarySupervisorOptions = secondarySupervisors.map((secondary) => ({
    value: secondary.id,
    label: `${secondary.name} - ${secondary.nip} (Sisa kuota: ${secondary.remaining_quota})`
  }));
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: "Mahasiswa",
      type: "add",
      maxWidth: "2xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-1/2", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIM" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "nim",
                type: "number",
                name: "nim",
                value: (_b = (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.student) == null ? void 0 : _b.nim,
                className: "mt-1 block w-full",
                required: true,
                autoComplete: "nim",
                placeholder: "nim"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-1/2", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: `${t2("global.name")}` }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                name: "name",
                value: auth == null ? void 0 : auth.user.name,
                className: "mt-1 block w-full",
                required: true,
                autoComplete: "name",
                placeholder: t2("global.name"),
                readonly: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Skripsi" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "title",
              name: "title",
              className: "mt-1 block w-full",
              value: data.title,
              onChange: handleChange,
              disabled: !!lockedPrimary || !!lockedSecondary,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "primary_supervisor", value: "Pembimbing Utama", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: primarySupervisorOptions,
              value: lockedPrimary ? { value: lockedPrimary.id, label: lockedPrimary.name } : primarySupervisorOptions.find((o) => o.value === data.primary_supervisor),
              onChange: (opt) => setData("primary_supervisor_id", opt == null ? void 0 : opt.value),
              isDisabled: !!lockedPrimary,
              placeholder: "Pilih Pembimbing Utama",
              required: true
            }
          ),
          lockedPrimary && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Supervisor terkunci karena sudah approve" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.primary_supervisor_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "secondary_supervisor", value: "Pembimbing Pendamping", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: secondarySupervisorOptions,
              value: lockedSecondary ? { value: lockedSecondary.id, label: lockedSecondary.name } : secondarySupervisorOptions.find((o) => o.value === data.secondary_supervisor),
              onChange: (opt) => setData("secondary_supervisor_id", opt == null ? void 0 : opt.value),
              isDisabled: !!lockedSecondary,
              placeholder: "Pilih Pembimbing Pendamping",
              required: true
            }
          ),
          lockedSecondary && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Supervisor terkunci karena sudah approve" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.secondary_supervisor_id, className: "mt-2" })
        ] })
      ]
    }
  );
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateModal$3
}, Symbol.toStringTag, { value: "Module" }));
function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}
function formatDateTimeId(value, fallback = "-") {
  const d = parseDate(value);
  if (!d) return fallback;
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const StudentTable$1 = () => {
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/dashboard/student/data", {
      params: {
        page: currentPage,
        search
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch]);
  const columns = [
    {
      header: "NIM",
      accessor: (row) => {
        var _a;
        return ((_a = row.student) == null ? void 0 : _a.nim) ?? "-";
      }
    },
    {
      header: "Nama",
      accessor: (row) => {
        var _a;
        return ((_a = row.student) == null ? void 0 : _a.name) ?? "-";
      }
    },
    {
      header: "Kelas",
      accessor: (row) => {
        var _a;
        return ((_a = row.student) == null ? void 0 : _a.class_name) ?? "-";
      }
    },
    {
      header: "Prodi",
      className: "text-center",
      accessor: (row) => {
        var _a;
        return ((_a = row.student) == null ? void 0 : _a.study_program) ? /* @__PURE__ */ jsxs("span", { className: "text-black p-2", children: [
          row.student.study_program.code,
          " — ",
          row.student.study_program.name
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "-" });
      }
    },
    {
      header: "Versi",
      className: "text-center",
      accessor: (row) => /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        "v",
        row.version
      ] })
    },
    {
      header: "Judul Skripsi",
      accessor: "title"
    },
    {
      header: "Pembimbing Utama",
      accessor: (row) => {
        var _a, _b, _c, _d, _e;
        return ((_b = (_a = row.primary_supervisor) == null ? void 0 : _a.lecturer) == null ? void 0 : _b.name) ? /* @__PURE__ */ jsxs("div", { children: [
          ((_d = (_c = row.primary_supervisor) == null ? void 0 : _c.lecturer) == null ? void 0 : _d.name) ?? "-",
          ((_e = row.primary_supervisor) == null ? void 0 : _e.approval_status) && /* @__PURE__ */ jsxs(
            "div",
            {
              className: `items-center gap-2 px-2 py-1 text-xs text-white rounded-lg ${row.primary_supervisor.approval_status === "accepted" ? "bg-green-500" : row.primary_supervisor.approval_status === "rejected" ? "bg-red-500" : "bg-yellow-500"}`,
              children: [
                row.primary_supervisor.approval_status === "accepted" && "Diterima",
                row.primary_supervisor.approval_status === "rejected" && "Ditolak",
                row.primary_supervisor.approval_status === "pending" && "Menunggu",
                /* @__PURE__ */ jsx("span", { className: "ms-2", children: formatDateTimeId(row.primary_supervisor.approved_at) })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Belum ada" });
      }
    },
    {
      header: "Pendamping",
      accessor: (row) => {
        var _a, _b, _c, _d, _e;
        return ((_b = (_a = row.secondary_supervisor) == null ? void 0 : _a.lecturer) == null ? void 0 : _b.name) ? /* @__PURE__ */ jsxs("div", { children: [
          ((_d = (_c = row.secondary_supervisor) == null ? void 0 : _c.lecturer) == null ? void 0 : _d.name) ?? "-",
          ((_e = row.secondary_supervisor) == null ? void 0 : _e.approval_status) && /* @__PURE__ */ jsxs(
            "div",
            {
              className: `items-center gap-2 px-2 py-1 text-xs text-white rounded-lg ${row.secondary_supervisor.approval_status === "accepted" ? "bg-green-500" : row.secondary_supervisor.approval_status === "rejected" ? "bg-red-500" : "bg-yellow-500"}`,
              children: [
                row.secondary_supervisor.approval_status === "accepted" && "Diterima",
                row.secondary_supervisor.approval_status === "rejected" && "Ditolak",
                row.secondary_supervisor.approval_status === "pending" && "Menunggu",
                /* @__PURE__ */ jsx("span", { className: "ms-2", children: formatDateTimeId(row.secondary_supervisor.rejected_at) })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Belum ada" });
      }
    },
    {
      header: "Alasan Ditolak Pembimbing Utama",
      accessor: (row) => {
        var _a;
        return ((_a = row.primary_supervisor) == null ? void 0 : _a.rejection_reason) ?? "-";
      }
    },
    {
      header: "Alasan Ditolak Pendamping",
      accessor: (row) => {
        var _a;
        return ((_a = row.secondary_supervisor) == null ? void 0 : _a.rejection_reason) ?? "-";
      }
    },
    {
      header: "Aksi",
      className: "text-center",
      accessor: (row) => {
        if (row.status !== "fully_approved") {
          return /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic text-sm", children: "Belum tersedia" });
        }
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => window.open(
              `/admin/thesis-submission/${row.id}/print`,
              "_blank"
            ),
            className: "px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700",
            children: "Print"
          }
        );
      }
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data,
        currentPage,
        totalPages,
        onSearch: handleSearch,
        onPageChange: (page) => setCurrentPage(page),
        onAdd: () => setIsModalOpen(true),
        addType: "modal",
        addButtonText: "Permintaan",
        AddModalContent: CreateModal$3,
        selectable: true,
        isProcessing: isLoading
      }
    ),
    /* @__PURE__ */ jsx(CreateModal$3, { isOpen: isModalOpen, onClose: toggleModal, setRefetch })
  ] });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StudentTable$1
}, Symbol.toStringTag, { value: "Module" }));
const StudentPage$1 = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Dashboard Mahasiswa"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx("span", { children: "Mahasiswa" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(
      TitleCard,
      {
        header: t2("dashboard.welcome"),
        description: "Ajukan permintaan pembimbing, judul skripsi dan tunggu status pengajuan di setujui pembimbing yang dipilih"
      }
    ) }),
    /* @__PURE__ */ jsx(StudentTable$1, {})
  ] }) });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StudentPage$1
}, Symbol.toStringTag, { value: "Module" }));
const GuidanceFilter = ({ onApply }) => {
  const [dateFrom, setDateFrom] = useState$1("");
  const [dateTo, setDateTo] = useState$1("");
  const handleApply = () => {
    onApply({
      date_from: dateFrom || null,
      date_to: dateTo || null
    });
  };
  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    onApply({
      date_from: null,
      date_to: null
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 items-end mb-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Dari Tanggal" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          value: dateFrom,
          onChange: (e) => setDateFrom(e.target.value),
          className: "border rounded px-3 py-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Sampai Tanggal" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          value: dateTo,
          onChange: (e) => setDateTo(e.target.value),
          className: "border rounded px-3 py-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleApply,
        className: "bg-blue-600 text-white px-4 py-2 rounded",
        children: "Terapkan"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleReset,
        className: "bg-gray-400 text-white px-4 py-2 rounded",
        children: "Reset"
      }
    )
  ] });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GuidanceFilter
}, Symbol.toStringTag, { value: "Module" }));
const GuidanceTable = () => {
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const [filters, setFilters] = useState$1({
    date_from: null,
    date_to: null
  });
  const handleApplyFilter = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/guidance-student/data", {
      params: {
        page: currentPage,
        search,
        date_from: filters.date_from,
        date_to: filters.date_to
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch, filters]);
  const columns = [
    {
      header: "NIM",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.nim) || "-";
      }
    },
    {
      header: "Nama Mahasiswa",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.name) || "-";
      }
    },
    {
      header: "Kelas",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.class_name) || "-";
      }
    },
    {
      header: "Prodi",
      className: "text-center",
      accessor: (row) => {
        var _a, _b;
        return ((_b = (_a = row.submission) == null ? void 0 : _a.student) == null ? void 0 : _b.study_program) ? /* @__PURE__ */ jsxs("div", { children: [
          row.submission.student.study_program.code,
          " - ",
          row.submission.student.study_program.name
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "-" });
      }
    },
    {
      header: "Judul Skripsi",
      accessor: (row) => {
        var _a, _b;
        return /* @__PURE__ */ jsx("div", { className: "max-w-xs truncate", title: ((_a = row.submission) == null ? void 0 : _a.title) || "-", children: ((_b = row.submission) == null ? void 0 : _b.title) || "-" });
      }
    },
    {
      header: "Peran",
      className: "text-center",
      accessor: (row) => /* @__PURE__ */ jsx("div", { className: `text-white px-3 py-1 rounded-full text-xs font-semibold ${row.role === "primary" ? "bg-blue-500" : "bg-purple-500"}`, children: row.role === "primary" ? "Pembimbing Utama" : "Pembimbing Sekunder" })
    },
    {
      header: "Diajukan pada",
      className: "text-center",
      accessor: (row) => /* @__PURE__ */ jsx("div", { children: formatDateTimeId(row.created_at) })
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(GuidanceFilter, { onApply: handleApplyFilter }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data,
        currentPage,
        totalPages,
        onSearch: handleSearch,
        onPageChange: (page) => setCurrentPage(page),
        selectable: true,
        isProcessing: isLoading,
        hideAddButton: true
      }
    )
  ] });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GuidanceTable
}, Symbol.toStringTag, { value: "Module" }));
const Index = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Master Mahasiswa",
        subtitle: "Kelola akun dosen dalam sistem"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx("span", { children: "Mahasiswa" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(
      TitleCard,
      {
        header: "Mahasiswa Bimbingan",
        description: "Daftar Mahasiswa Bimbingan Saat Ini"
      }
    ) }),
    /* @__PURE__ */ jsx(GuidanceTable, {})
  ] }) });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const ActiveToggle = ({
  value,
  onChange,
  name = "is_active",
  required = false,
  label = "Status",
  activeLabel,
  inactiveLabel,
  activeKey = "global.active",
  inactiveKey = "global.inactive",
  selectedStatusKey = "global.selectedStatus"
}) => {
  const { t: t2 } = useTranslation();
  const isActive = value === true || value === 1;
  const isInactive = value === false || value === 0;
  const activeText = activeLabel ?? t2(activeKey);
  const inactiveText = inactiveLabel ?? t2(inactiveKey);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: name, value: label, required }),
    /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500 mb-1", children: [
      t2(selectedStatusKey),
      ":",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: isActive ? activeText : inactiveText })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "radiogroup",
        "aria-label": label,
        className: "inline-flex rounded-md mt-2",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isActive,
              className: `px-6 py-2 cursor-pointer border border-gray-200 rounded-l-md transition-colors focus:outline-none ${isActive ? "text-white bg-blue-600 hover:bg-blue-700" : "text-gray-600 hover:bg-blue-100"}`,
              onClick: () => onChange(true),
              id: `${name}-active`,
              children: activeText
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isInactive,
              className: `px-6 py-2 cursor-pointer border border-gray-200 rounded-r-md transition-colors focus:outline-none ${isInactive ? "text-white bg-blue-600 hover:bg-blue-700" : "text-gray-600 hover:bg-blue-100"}`,
              onClick: () => onChange(false),
              id: `${name}-inactive`,
              children: inactiveText
            }
          )
        ]
      }
    )
  ] });
};
const CreateModal$2 = ({ isOpen: isOpen2, onClose, setRefetch }) => {
  const [studyPrograms, setStudyPrograms] = useState$1([]);
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    nip: "",
    name: "",
    quota: "",
    can_supervisor_1: "",
    can_supervisor_2: "",
    study_program_id: "",
    image: "",
    message: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/lecturer", {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil dibuat"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  useEffect$1(() => {
    if (!isOpen2) return;
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      setStudyPrograms(result.data.studyPrograms || []);
    }).catch(() => {
      Swal$1.fire("Error!", "Gagal mengambil data", "error");
    });
  }, [isOpen2]);
  const studyProgramOptions = studyPrograms.map((studyProgram) => ({
    value: studyProgram.id,
    label: `${studyProgram.code} - ${studyProgram.name}`
  }));
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("lecturer.create"),
      type: "add",
      maxWidth: "2xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nip", value: "NIP", required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nip",
              type: "number",
              name: "nip",
              value: data.nip,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "nip",
              placeholder: "nip"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nip, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: `${t2("global.name")}`, required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "name",
              placeholder: t2("global.name")
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: `${t2("global.email")}`, required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "email",
              id: "email",
              name: "email",
              value: data.email,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "email",
              placeholder: t2("global.email")
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quota", value: `Kuota`, required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "number",
              id: "quota",
              name: "quota",
              value: data.quota,
              onChange: handleChange,
              className: "mt-1 block w-full",
              autoComplete: "quota",
              placeholder: "Kuota",
              min: "0",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.quota, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "study_program", value: "Program Studi", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: studyProgramOptions,
              id: "study_program_id",
              name: "study_program_id",
              value: studyProgramOptions.find((option) => option.value === data.study_program_id) || null,
              onChange: (selectedOption) => {
                setData("study_program_id", selectedOption ? selectedOption.value : "");
              },
              placeholder: "Pilih Prodi",
              isClearable: true,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.study_program, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx(
          ActiveToggle,
          {
            label: "Dapat menjadi pembimbing 1?",
            value: data.can_supervisor_1,
            onChange: (val) => setData("can_supervisor_1", val),
            activeLabel: "Ya",
            inactiveLabel: "Tidak"
          }
        ),
        /* @__PURE__ */ jsx(
          ActiveToggle,
          {
            label: "Dapat menjadi pembimbing 2?",
            value: data.can_supervisor_2,
            onChange: (val) => setData("can_supervisor_2", val),
            activeLabel: "Ya",
            inactiveLabel: "Tidak"
          }
        )
      ]
    }
  );
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateModal$2
}, Symbol.toStringTag, { value: "Module" }));
const EditModal$2 = ({ isOpen: isOpen2, onClose, lecturer, setRefetch }) => {
  if (!lecturer) return null;
  const { t: t2, i18n } = useTranslation();
  const [studyPrograms, setStudyPrograms] = useState$1([]);
  const { data, setData, reset, processing, errors } = useForm({
    nip: lecturer.nip || "",
    name: lecturer.name || "",
    email: lecturer.user.email || "",
    quota: lecturer.quota || "",
    can_supervisor_1: lecturer.can_supervisor_1 ?? false,
    can_supervisor_2: lecturer.can_supervisor_2 ?? false,
    study_program_id: lecturer.study_program_id || "",
    image: lecturer.image || null
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...data, _method: "put" };
    if (payload.image && typeof payload.image !== "object") {
      delete payload.image;
    }
    router.post(`/admin/lecturer/${lecturer.id}`, payload, {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil diubah"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(
          errors2.message,
          i18n.language
        );
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  useEffect$1(() => {
    if (!isOpen2) return;
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      setStudyPrograms(result.data.studyPrograms || []);
    }).catch(() => {
      Swal$1.fire("Error!", "Gagal mengambil data", "error");
    });
  }, [isOpen2]);
  const studyProgramOptions = studyPrograms.map((sp) => ({
    value: sp.id,
    label: `${sp.code} - ${sp.name}`
  }));
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("lecturer.pageTitle"),
      type: "edit",
      maxWidth: "2xl",
      processing,
      onSubmit: handleSubmit,
      onCancel: () => {
        onClose();
        reset();
      },
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nip", value: "NIP" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nip",
              type: "number",
              name: "nip",
              value: data.nip,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nip })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name") }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t2("global.email") }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "email",
              id: "email",
              name: "email",
              value: data.email,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quota", value: "Kuota" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "number",
              id: "quota",
              name: "quota",
              value: data.quota,
              min: "0",
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.quota })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "study_program_id", value: "Program Studi" }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: studyProgramOptions,
              value: studyProgramOptions.find(
                (o) => o.value === data.study_program_id
              ) || null,
              onChange: (opt) => setData("study_program_id", opt ? opt.value : ""),
              placeholder: "Pilih Prodi",
              isClearable: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.study_program_id })
        ] }),
        /* @__PURE__ */ jsx(
          ActiveToggle,
          {
            label: "Dapat menjadi pembimbing 1?",
            value: data.can_supervisor_1,
            onChange: (v) => setData("can_supervisor_1", v),
            activeLabel: "Ya",
            inactiveLabel: "Tidak"
          }
        ),
        /* @__PURE__ */ jsx(
          ActiveToggle,
          {
            label: "Dapat menjadi pembimbing 2?",
            value: data.can_supervisor_2,
            onChange: (v) => setData("can_supervisor_2", v),
            activeLabel: "Ya",
            inactiveLabel: "Tidak"
          }
        )
      ]
    }
  );
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditModal$2
}, Symbol.toStringTag, { value: "Module" }));
const Input = ({ type = "text", className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: `w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${className}`,
      ...props
    }
  );
};
const Button = ({ children, onClick, className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: `px-4 py-2 rounded-full font-medium transition ${className}`,
      ...props,
      children
    }
  );
};
function DateFilterExport({
  onApply,
  exportUrl,
  defaultFilters = {
    date_from: "",
    date_to: ""
  }
}) {
  const [localFilters, setLocalFilters] = useState$1(defaultFilters);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleApply = () => {
    onApply(localFilters);
  };
  const handleReset = () => {
    const resetValue = {
      date_from: "",
      date_to: ""
    };
    setLocalFilters(resetValue);
    onApply(resetValue);
  };
  const handleExport = () => {
    const params = new URLSearchParams(localFilters).toString();
    window.open(`${exportUrl}?${params}`, "_blank");
  };
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-gray-600 mb-1", children: "Tanggal Mulai" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "date",
          name: "date_from",
          value: localFilters.date_from,
          onChange: handleChange,
          className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#D9B36A] focus:border-[#D9B36A] transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-gray-600 mb-1", children: "Tanggal Selesai" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "date",
          name: "date_to",
          value: localFilters.date_to,
          onChange: handleChange,
          className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#D9B36A] focus:border-[#D9B36A] transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 ml-auto", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleApply,
          className: "bg-[#D9B36A] hover:bg-[#c49d4e] text-white px-5 py-2 rounded-lg shadow-sm transition",
          children: "Terapkan"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleReset,
          className: "bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition",
          children: "Reset"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleExport,
          className: "bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-sm transition",
          children: "Export"
        }
      )
    ] })
  ] }) });
}
const LecturerTable = () => {
  const { t: t2, i18n } = useTranslation();
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isEditModalOpen, setIsEditModalOpen] = useState$1(false);
  const [selectedLecturer, setSelectedLecturer] = useState$1(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState$1(false);
  const [SelectedLecturerId, setSelectedLecturerId] = useState$1(null);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState$1(false);
  const [selectedIds, setSelectedIds] = useState$1([]);
  const [isProcessing, setIsProcessing] = useState$1(false);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const [filters, setFilters] = useState$1("");
  const openEditModal = (lecturer) => {
    axios$1.get(`/admin/lecturer/${lecturer.id}/edit`).then((response) => {
      setSelectedLecturer(response.data.data);
      setIsEditModalOpen(true);
    }).catch((error) => {
      var _a, _b;
      setIsProcessing(false);
      const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred.";
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const handleApplyFilter = (filters2) => {
    setCurrentPage(1);
    setFilters(filters2);
  };
  const closeEditModal = () => {
    setSelectedLecturer(null);
    setIsEditModalOpen(false);
  };
  const openDeleteModal = (lecturerId) => {
    setSelectedLecturerId(lecturerId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedLecturerId(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsProcessing(true);
    axios$1.delete(`/admin/lecturer/${SelectedLecturerId}`).then(() => {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
      Swal$1.fire(
        t2("global.swalDeleted", "Deleted!"),
        "Data berhasil dihapus",
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleDeleteSelected = (ids) => {
    setSelectedIds(ids);
    setIsDeleteSelectedModalOpen(true);
  };
  const confirmDeleteSelected = () => {
    setIsProcessing(true);
    axios$1.post(route("Admin.lecturer.bulk-delete"), { ids: selectedIds }).then(() => {
      setIsProcessing(false);
      setIsDeleteSelectedModalOpen(false);
      Swal$1.fire("Deleted!", "Data yang terpilih berhasil dihapus.", "success");
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/lecturer/data", {
      params: {
        page: currentPage,
        search,
        ...filters
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch, filters]);
  const columns = [
    {
      header: "Nip",
      accessor: "nip"
    },
    {
      header: "Nama",
      accessor: "name"
    },
    {
      header: "Prodi",
      className: "text-center",
      accessor: (row) => row.study_program ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-white p-2 bg-slate-400 rounded-md", children: [
        row.study_program.code,
        " - ",
        row.study_program.name
      ] }) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic" })
    },
    {
      header: "Kuota",
      accessor: "quota",
      className: "text-center"
    },
    {
      header: "Kuota Tersedia",
      className: "text-center",
      accessor: (row) => row.remaining_quota ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "text-white p-2 bg-green-500 rounded-lg", children: row.remaining_quota }) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "0" })
    },
    {
      header: t2("global.actions"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => openEditModal(row),
            className: "inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700",
            children: [
              /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: t2("global.edit") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(DangerButton, { onClick: () => openDeleteModal(row.id), children: [
          /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5 me-2 rounded-full bg-red-400 p-1 text-white" }),
          " ",
          /* @__PURE__ */ jsx("span", { children: t2("global.delete") })
        ] })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DateFilterExport,
      {
        onApply: handleApplyFilter,
        exportUrl: "admin/lecturer/export"
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(
        Table,
        {
          columns,
          data,
          currentPage,
          totalPages,
          onSearch: handleSearch,
          onPageChange: (page) => setCurrentPage(page),
          onAdd: () => setIsModalOpen(true),
          addType: "modal",
          addButtonText: "Dosen",
          AddModalContent: CreateModal$2,
          selectable: true,
          onDeleteSelected: handleDeleteSelected,
          isProcessing: isLoading
        }
      ),
      /* @__PURE__ */ jsx(CreateModal$2, { isOpen: isModalOpen, onClose: toggleModal, setRefetch }),
      /* @__PURE__ */ jsx(
        EditModal$2,
        {
          isOpen: isEditModalOpen,
          onClose: closeEditModal,
          lecturer: selectedLecturer,
          setRefetch
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDeleteModal,
        {
          isOpen: isDeleteModalOpen,
          onClose: closeDeleteModal,
          onDelete: handleDelete,
          title: "Dosen",
          description: "Hapus Data dosen, data dapat dipulihkan",
          deleteButtonText: "Hapus Data",
          isProcessing
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDeleteModal,
        {
          isOpen: isDeleteSelectedModalOpen,
          onClose: () => setIsDeleteSelectedModalOpen(false),
          onDelete: confirmDeleteSelected,
          title: t2("lecturer.deleteSelectedTitle", "Delete Selected Lecturers"),
          description: t2("lecturer.deleteSelectedDescription", "Are you sure you want to delete the selected lecturer? This action cannot be undone."),
          deleteButtonText: t2("lecturer.deleteSelectedButton", "Delete Selected"),
          isProcessing
        }
      )
    ] })
  ] });
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LecturerTable
}, Symbol.toStringTag, { value: "Module" }));
const LecturerPage = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Master Dosen",
        subtitle: "Kelola akun dosen dalam sistem"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx("span", { children: "Dosen" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(
        TitleCard,
        {
          header: "Master Dosen",
          description: "Kelola data Dosen pada halaman ini"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Total Dosen Aktif`,
          value: usePage().props.activeLecturerCount || "0",
          icon: UserGroupIcon$1
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Total Non Aktif`,
          value: usePage().props.nonActiveLecturerCount || "0",
          icon: UserGroupIcon$1
        }
      )
    ] }),
    /* @__PURE__ */ jsx(LecturerTable, {})
  ] }) });
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LecturerPage
}, Symbol.toStringTag, { value: "Module" }));
const CreateModal$1 = ({ isOpen: isOpen2, onClose, setRefetch }) => {
  const [studyPrograms, setStudyPrograms] = useState$1([]);
  const [primarySupervisors, setPrimarySupervisors] = useState$1([]);
  const [secondarySupervisors, setSecondarySupervisors] = useState$1([]);
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    nim: "",
    title: "",
    name: "",
    class_name: "",
    email: "",
    study_program_id: "",
    message: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/student", {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil dibuat"
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  useEffect$1(() => {
    if (!isOpen2) return;
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      setStudyPrograms(result.data.studyPrograms || []);
    }).catch(() => {
      Swal$1.fire("Error!", "Gagal mengambil data", "error");
    });
  }, [isOpen2]);
  useEffect$1(() => {
    if (!isOpen2) return;
    const loadSupervisorLock = async () => {
      try {
        fetch("/lecturer/primary-supervisor/select-data").then((res) => res.json()).then((result) => {
          setPrimarySupervisors(result.data.primarySupervisor || []);
        });
        fetch("/lecturer/secondary-supervisor/select-data").then((res) => res.json()).then((result) => {
          setSecondarySupervisors(result.data.secondarySupervisor || []);
        });
      } catch (e) {
        Swal$1.fire("Error!", "Gagal memuat data", "error");
      }
    };
    loadSupervisorLock();
  }, [isOpen2]);
  const primarySupervisorOptions = primarySupervisors.map((primary) => ({
    value: primary.id,
    label: `${primary.name} - ${primary.nip} (Sisa kuota: ${primary.remaining_quota})`
  }));
  const secondarySupervisorOptions = secondarySupervisors.map((secondary) => ({
    value: secondary.id,
    label: `${secondary.name} - ${secondary.nip} (Sisa kuota: ${secondary.remaining_quota})`
  }));
  const studyProgramOptions = studyPrograms.map((studyProgram) => ({
    value: studyProgram.id,
    label: `${studyProgram.code} - ${studyProgram.name}`
  }));
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: "Mahasiswa",
      type: "add",
      maxWidth: "2xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIM", required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nim",
              type: "number",
              name: "nim",
              value: data.nim,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "nim",
              placeholder: "nim"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nim, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: `${t2("global.name")}`, required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "name",
              placeholder: t2("global.name")
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "class_name", value: "Kelas" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "class_name",
              name: "class_name",
              value: data.class_name,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.class_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Skripsi", required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "title",
              name: "title",
              value: data.title,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "title",
              placeholder: "Judul Skripsi"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: `${t2("global.email")}`, required: true }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "email",
              id: "email",
              name: "email",
              value: data.email,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "email",
              placeholder: t2("global.email")
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "study_program", value: "Program Studi", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: studyProgramOptions,
              id: "study_program_id",
              name: "study_program_id",
              value: studyProgramOptions.find((option) => option.value === data.study_program_id) || null,
              onChange: (selectedOption) => {
                setData("study_program_id", selectedOption ? selectedOption.value : "");
              },
              placeholder: "Pilih Prodi",
              isClearable: true,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.study_program_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "primary_supervisor", value: "Pembimbing Utama", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: primarySupervisorOptions,
              value: primarySupervisorOptions.find((o) => o.value === data.primary_supervisor),
              onChange: (opt) => setData("primary_supervisor_id", opt == null ? void 0 : opt.value),
              placeholder: "Pilih Pembimbing Utama",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.primary_supervisor_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "secondary_supervisor", value: "Pembimbing Pendamping", required: true }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: secondarySupervisorOptions,
              value: secondarySupervisorOptions.find((o) => o.value === data.secondary_supervisor),
              onChange: (opt) => setData("secondary_supervisor_id", opt == null ? void 0 : opt.value),
              placeholder: "Pilih Pembimbing Pendamping",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.secondary_supervisor_id, className: "mt-2" })
        ] })
      ]
    }
  );
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateModal$1
}, Symbol.toStringTag, { value: "Module" }));
const EditModal$1 = ({ isOpen: isOpen2, onClose, student, setRefetch }) => {
  if (!student) return null;
  const { t: t2, i18n } = useTranslation();
  const [studyPrograms, setStudyPrograms] = useState$1([]);
  const { data, setData, reset, processing, errors } = useForm({
    nim: student.nim || "",
    name: student.name || "",
    class_name: student.class_name || "",
    title: student.latest_thesis_submission.title || "",
    email: student.user.email || "",
    study_program_id: student.study_program_id || "",
    image: student.image || null
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...data, _method: "put" };
    if (payload.image && typeof payload.image !== "object") {
      delete payload.image;
    }
    router.post(`/admin/student/${student.id}`, payload, {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: "Data berhasil diubah"
        });
      },
      onError: (errors2) => {
        const errorMessage = Object.values(errors2).join("\n");
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  useEffect$1(() => {
    if (!isOpen2) return;
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      setStudyPrograms(result.data.studyPrograms || []);
    }).catch(() => {
      Swal$1.fire("Error!", "Gagal mengambil data", "error");
    });
  }, [isOpen2]);
  const studyProgramOptions = studyPrograms.map((sp) => ({
    value: sp.id,
    label: `${sp.code} - ${sp.name}`
  }));
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: "Mahasiswa",
      type: "edit",
      maxWidth: "2xl",
      processing,
      onSubmit: handleSubmit,
      onCancel: () => {
        onClose();
        reset();
      },
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIP" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nim",
              type: "number",
              name: "nim",
              value: data.nim,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nim })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name") }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "class_name", value: "Kelas" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "class_name",
              name: "class_name",
              value: data.class_name,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.class_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Skripsi" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "title",
              name: "title",
              value: data.title,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t2("global.email") }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "email",
              id: "email",
              name: "email",
              value: data.email,
              onChange: handleChange,
              className: "mt-1 block w-full"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "study_program_id", value: "Program Studi" }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: studyProgramOptions,
              value: studyProgramOptions.find(
                (o) => o.value === data.study_program_id
              ) || null,
              onChange: (opt) => setData("study_program_id", opt ? opt.value : ""),
              placeholder: "Pilih Prodi",
              isClearable: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.study_program_id })
        ] })
      ]
    }
  );
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditModal$1
}, Symbol.toStringTag, { value: "Module" }));
const StudentTable = () => {
  const { t: t2, i18n } = useTranslation();
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isEditModalOpen, setIsEditModalOpen] = useState$1(false);
  const [selectedStudent, setSelectedStudent] = useState$1(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState$1(false);
  const [SelectedStudentId, setSelectedStudentId] = useState$1(null);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState$1(false);
  const [selectedIds, setSelectedIds] = useState$1([]);
  const [isProcessing, setIsProcessing] = useState$1(false);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const [filters, setFilters] = useState$1("");
  const openEditModal = (student) => {
    axios$1.get(`/admin/student/${student.id}/edit`).then((response) => {
      setSelectedStudent(response.data.data);
      setIsEditModalOpen(true);
    }).catch((error) => {
      var _a, _b;
      setIsProcessing(false);
      const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred.";
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const handleApplyFilter = (filters2) => {
    setCurrentPage(1);
    setFilters(filters2);
  };
  const closeEditModal = () => {
    setSelectedStudent(null);
    setIsEditModalOpen(false);
  };
  const openDeleteModal = (studentId) => {
    setSelectedStudentId(studentId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedStudentId(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsProcessing(true);
    axios$1.delete(`/admin/student/${SelectedStudentId}`).then(() => {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
      Swal$1.fire(
        t2("Berhasil!"),
        "Data berhasil dihapus",
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleDeleteSelected = (ids) => {
    setSelectedIds(ids);
    setIsDeleteSelectedModalOpen(true);
  };
  const confirmDeleteSelected = () => {
    setIsProcessing(true);
    axios$1.post(route("Admin.student.bulk-delete"), { ids: selectedIds }).then(() => {
      setIsProcessing(false);
      setIsDeleteSelectedModalOpen(false);
      Swal$1.fire("Berhasil", "Data yang terpilih berhasil dihapus.", "success");
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/student/data", {
      params: {
        page: currentPage,
        search,
        ...filters
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  const statusBadge = {
    draft: "bg-gray-500",
    waiting_supervisor: "bg-yellow-500",
    partially_approved: "bg-blue-500",
    fully_approved: "bg-green-600",
    revision_required: "bg-red-500"
  };
  const statusLabel = {
    draft: "Draft",
    waiting_supervisor: "Menunggu Persetujuan Pembimbing",
    partially_approved: "Disetujui Sebagian",
    fully_approved: "Disetujui Penuh",
    revision_required: "Perlu Revisi"
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch, filters]);
  const columns = [
    {
      header: "Nim",
      accessor: "nim"
    },
    {
      header: "Nama",
      accessor: "name"
    },
    {
      header: "Kelas",
      accessor: "class_name"
    },
    {
      header: "Prodi",
      className: "text-center",
      accessor: (row) => row.study_program ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-white p-2 bg-slate-400 rounded-md", children: [
        row.study_program.code,
        " - ",
        row.study_program.name
      ] }) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "-" })
    },
    {
      header: "Judul Skripsi",
      className: "text-center",
      accessor: (row) => row.latest_thesis_submission ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "text-black fw-bold p-2", children: row.latest_thesis_submission.title }) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Belum mengajukan judul" })
    },
    {
      header: "Status Skripsi",
      className: "text-center",
      accessor: (row) => {
        var _a;
        const status = (_a = row.latest_thesis_submission) == null ? void 0 : _a.status;
        if (!status) {
          return /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic text-xs", children: "Belum mengajukan judul" });
        }
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `text-white text-xs px-2 py-1 rounded font-semibold ${statusBadge[status] ?? "bg-gray-400"}`,
            children: statusLabel[status] ?? status
          }
        );
      }
    },
    {
      header: "Pembimbing Utama",
      className: "text-center",
      accessor: (row) => {
        var _a, _b, _c;
        return ((_a = row.latest_thesis_submission) == null ? void 0 : _a.primary_supervisor) ? /* @__PURE__ */ jsx(
          "span",
          {
            className: "fw-bold text-center",
            children: (_c = (_b = row.latest_thesis_submission) == null ? void 0 : _b.primary_supervisor) == null ? void 0 : _c.lecturer.name
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic text-xs", children: "Belum memilih pembimbing 1" });
      }
    },
    {
      header: "Pendamping",
      className: "text-center",
      accessor: (row) => {
        var _a, _b, _c;
        return ((_a = row.latest_thesis_submission) == null ? void 0 : _a.secondary_supervisor) ? /* @__PURE__ */ jsx(
          "span",
          {
            className: "fw-bold text-center",
            children: (_c = (_b = row.latest_thesis_submission) == null ? void 0 : _b.secondary_supervisor) == null ? void 0 : _c.lecturer.name
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic text-xs", children: "Belum memilih pembimbing 1" });
      }
    },
    {
      header: t2("global.actions"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => openEditModal(row),
            className: "inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700",
            children: [
              /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: t2("global.edit") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(DangerButton, { onClick: () => openDeleteModal(row.id), children: [
          /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5 me-2 rounded-full bg-red-400 p-1 text-white" }),
          " ",
          /* @__PURE__ */ jsx("span", { children: t2("global.delete") })
        ] })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DateFilterExport,
      {
        onApply: handleApplyFilter,
        exportUrl: "admin/student/export"
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(
        Table,
        {
          columns,
          data,
          currentPage,
          totalPages,
          onSearch: handleSearch,
          onPageChange: (page) => setCurrentPage(page),
          onAdd: () => setIsModalOpen(true),
          addType: "modal",
          addButtonText: "Mahasiswa",
          AddModalContent: CreateModal$1,
          selectable: true,
          onDeleteSelected: handleDeleteSelected,
          isProcessing: isLoading
        }
      ),
      /* @__PURE__ */ jsx(CreateModal$1, { isOpen: isModalOpen, onClose: toggleModal, setRefetch }),
      /* @__PURE__ */ jsx(
        EditModal$1,
        {
          isOpen: isEditModalOpen,
          onClose: closeEditModal,
          student: selectedStudent,
          setRefetch
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDeleteModal,
        {
          isOpen: isDeleteModalOpen,
          onClose: closeDeleteModal,
          onDelete: handleDelete,
          title: "Mahasiswa",
          description: "Hapus Data mahasiswa, data dapat dipulihkan",
          deleteButtonText: "Hapus Data",
          isProcessing
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDeleteModal,
        {
          isOpen: isDeleteSelectedModalOpen,
          onClose: () => setIsDeleteSelectedModalOpen(false),
          onDelete: confirmDeleteSelected,
          title: t2("student.deleteSelectedTitle", "Delete Selected Students"),
          description: t2("student.deleteSelectedDescription", "Are you sure you want to delete the selected student? This action cannot be undone."),
          deleteButtonText: t2("student.deleteSelectedButton", "Delete Selected"),
          isProcessing
        }
      )
    ] })
  ] });
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StudentTable
}, Symbol.toStringTag, { value: "Module" }));
const StudentPage = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Master Mahasiswa",
        subtitle: "Kelola akun dosen dalam sistem"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: /* @__PURE__ */ jsx("span", { children: "Mahasiswa" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(
        TitleCard,
        {
          header: "Master Mahasiswa",
          description: "Kelola data Mahasiswa pada halaman ini"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Total Mahasiswa Aktif`,
          value: usePage().props.activeStudentCount || "0",
          icon: UserGroupIcon$1
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Total Non Aktif`,
          value: usePage().props.nonActiveStudentCount || "0",
          icon: UserGroupIcon$1
        }
      )
    ] }),
    /* @__PURE__ */ jsx(StudentTable, {})
  ] }) });
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StudentPage
}, Symbol.toStringTag, { value: "Module" }));
const menuItems = [
  { id: 1, name_en: "dashboard", name_id: "beranda" },
  { id: 2, name_en: "role", name_id: "peran" },
  { id: 3, name_en: "user", name_id: "pengguna" },
  { id: 4, name_en: "product", name_id: "produk" },
  { id: 5, name_en: "stand", name_id: "stand" },
  { id: 6, name_en: "category", name_id: "kategori" },
  { id: 7, name_en: "ingredient", name_id: "bahan" },
  { id: 8, name_en: "setting", name_id: "pengaturan" }
];
const PermissionToggle = ({ value = [], onChange, isReadonly = false }) => {
  const [selected, setSelected] = useState$1({});
  const { t: t2, i18n } = useTranslation();
  useEffect$1(() => {
    const obj = {};
    value.forEach((val) => {
      if (typeof val === "number") {
        const found = menuItems.find((item) => item.id === val);
        if (found) obj[found.name_en] = true;
      } else if (typeof val === "string") {
        obj[val] = true;
      }
    });
    setSelected(obj);
  }, [value]);
  const toggle = (name_en) => {
    if (isReadonly) return;
    const updated = { ...selected, [name_en]: !selected[name_en] };
    setSelected(updated);
    if (onChange) {
      const names = menuItems.filter((item) => updated[item.name_en]).map((item) => item.name_en);
      onChange(names);
    }
  };
  const selectAll = () => {
    if (isReadonly) return;
    const allSelected = {};
    menuItems.forEach((item) => allSelected[item.name_en] = true);
    setSelected(allSelected);
    if (onChange) {
      onChange(menuItems.map((item) => item.name_en));
    }
  };
  const clearAll = () => {
    if (isReadonly) return;
    setSelected({});
    if (onChange) {
      onChange([]);
    }
  };
  const getLabel = (item) => i18n.language === "id" ? item.name_id : item.name_en;
  return /* @__PURE__ */ jsxs("div", { className: "p-4 rounded border bg-white", children: [
    !isReadonly && /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-4 gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: selectAll, type: "button", className: "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow", children: t2("global.selectAll") }),
      /* @__PURE__ */ jsx("button", { onClick: clearAll, type: "button", className: "bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded shadow", children: t2("global.clearAll") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: menuItems.map((item) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center space-x-2 cursor-pointer", children: [
      /* @__PURE__ */ jsxs("div", { className: `relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in`, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: !!selected[item.name_en],
            onChange: () => toggle(item.name_en),
            disabled: isReadonly,
            className: "toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `toggle-label block overflow-hidden h-6 rounded-full bg-indigo-900 ${selected[item.name_en] ? "bg-opacity-100" : "bg-opacity-50"}` })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 capitalize", children: getLabel(item) })
    ] }, item.id)) })
  ] });
};
const CreateModal = ({ isOpen: isOpen2, onClose, setRefetch }) => {
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    permission: [],
    message: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/role", {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: t2("global.swalSuccess"),
          text: t2("role.createdMessage")
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("role.pageTitle"),
      type: "add",
      maxWidth: "2xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: `${t2("global.name")}` }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "name",
              placeholder: `${t2("global.name")} ${t2("role.pageTitle")}`
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx(
          PermissionToggle,
          {
            value: data.permission,
            onChange: (val) => setData("permission", val)
          }
        )
      ]
    }
  );
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateModal
}, Symbol.toStringTag, { value: "Module" }));
const EditModal = ({ isOpen: isOpen2, onClose, role, setRefetch }) => {
  if (!role) {
    return null;
  }
  const { t: t2, i18n } = useTranslation();
  const { data, setData, put, processing, errors, reset } = useForm({
    name: role.name || "",
    permission: role.permission || [],
    message: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(`/Admin/role/${role.id}`, {
      ...data,
      _method: "put"
    }, {
      onSuccess: () => {
        reset();
        onClose();
        setRefetch((prev) => !prev);
        Swal$1.fire({
          icon: "success",
          title: t2("global.swalSuccess"),
          text: t2("role.pageTitle") + " " + t2("global.updatedMessage")
        });
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        console.error("Error updating role:", errors2);
        Swal$1.fire("Error!", errorMessage, "error");
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      show: isOpen2,
      onClose,
      title: t2("category.pageTitle"),
      type: "edit",
      maxWidth: "2xl",
      onCancel: () => {
        onClose();
        reset();
      },
      processing,
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: `${t2("global.name")}` }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              onChange: handleChange,
              className: "mt-1 block w-full",
              required: true,
              autoComplete: "name",
              placeholder: `${t2("global.name")} ${t2("role.pageTitle")}`
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx(
          PermissionToggle,
          {
            value: data.permission,
            onChange: (val) => setData("permission", val)
          }
        )
      ]
    }
  );
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditModal
}, Symbol.toStringTag, { value: "Module" }));
const PermissionDetailModal = ({
  isOpen: isOpen2,
  permission = [],
  onClose
}) => {
  return /* @__PURE__ */ jsx(Transition, { show: isOpen2, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: "mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full max-w-2xl",
                children: /* @__PURE__ */ jsx(
                  PermissionToggle,
                  {
                    value: permission,
                    isReadonly: true
                  }
                )
              }
            )
          }
        )
      ]
    }
  ) });
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PermissionDetailModal
}, Symbol.toStringTag, { value: "Module" }));
const IngredientTable = () => {
  const { t: t2, i18n } = useTranslation();
  const [data, setData] = useState$1([]);
  const [refetch, setRefetch] = useState$1(false);
  const [currentPage, setCurrentPage] = useState$1(1);
  const [totalPages, setTotalPages] = useState$1(1);
  const [isModalOpen, setIsModalOpen] = useState$1(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [isEditModalOpen, setIsEditModalOpen] = useState$1(false);
  const [selectedIngredient, setselectedIngredient] = useState$1(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState$1(false);
  const [selectedRoleId, setSelectedRoleId] = useState$1(null);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState$1(false);
  const [selectedIds, setSelectedIds] = useState$1([]);
  const [isProcessing, setIsProcessing] = useState$1(false);
  const [isLoading, setIsLoading] = useState$1(false);
  const [search, setSearch] = useState$1("");
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState$1(false);
  const [selectedPermission, setSelectedPermission] = useState$1([]);
  const openEditModal = (role) => {
    axios$1.get(`/admin/role/${role.id}/edit`).then((response) => {
      setselectedIngredient(response.data.data);
      setIsEditModalOpen(true);
    }).catch((error) => {
      var _a, _b;
      setIsProcessing(false);
      const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred.";
      Swal$1.fire("Error!", errorMessage, "error");
    });
  };
  const closeEditModal = () => {
    setselectedIngredient(null);
    setIsEditModalOpen(false);
  };
  const openDeleteModal = (roleId) => {
    setSelectedRoleId(roleId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedRoleId(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsProcessing(true);
    axios$1.delete(`/admin/role/${selectedRoleId}`).then(() => {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
      Swal$1.fire(
        t2("global.swalDeleted", "Deleted!"),
        t2("role.deletedMessage", "Role has been deleted."),
        "success"
      );
      setRefetch((prev) => !prev);
    }).catch((error) => {
      setIsProcessing(false);
      const errorMessage = getErrorMessage(error, t2, i18n.language);
      Swal$1.fire(
        t2("global.swalError", "Error!"),
        errorMessage,
        "error"
      );
    });
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (query !== search) {
      setCurrentPage(1);
    }
  };
  const fetchData = () => {
    setIsLoading(true);
    axios$1.get("/admin/role/data", {
      params: {
        page: currentPage,
        search
      }
    }).then((response) => {
      setData(response.data.data);
      setTotalPages(response.data.last_page);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  };
  useEffect$1(() => {
    fetchData();
  }, [currentPage, search, refetch]);
  const columns = [
    {
      header: t2("global.name"),
      accessor: "name",
      className: "font-semibold"
    },
    {
      header: t2("global.permission"),
      accessor: (row) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "rounded-md bg-gray-700 text-white font-semibold p-1",
          onClick: () => {
            setSelectedPermission(row.permission || []);
            setIsPermissionModalOpen(true);
          },
          children: t2("global.permission")
        }
      ),
      className: "text-center"
    },
    {
      header: t2("global.actions"),
      accessor: (row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => openEditModal(row),
            className: "inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700",
            children: [
              /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: t2("global.edit") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(DangerButton, { onClick: () => openDeleteModal(row.id), children: [
          /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5 me-2 rounded-full bg-red-400 p-1 text-white" }),
          " ",
          /* @__PURE__ */ jsx("span", { children: t2("global.delete") })
        ] })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data,
        currentPage,
        totalPages,
        onSearch: handleSearch,
        onPageChange: (page) => setCurrentPage(page),
        onAdd: () => setIsModalOpen(true),
        addType: "modal",
        addButtonText: t2("role.pageTitle", "Role"),
        AddModalContent: CreateModal,
        selectable: true,
        isProcessing: isLoading,
        useSelectedDelete: false
      }
    ),
    /* @__PURE__ */ jsx(CreateModal, { isOpen: isModalOpen, onClose: toggleModal, setRefetch }),
    /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isEditModalOpen,
        onClose: closeEditModal,
        role: selectedIngredient,
        setRefetch
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDeleteModal,
      {
        isOpen: isDeleteModalOpen,
        onClose: closeDeleteModal,
        onDelete: handleDelete,
        title: t2("role.deleteTitle", "Delete Role"),
        description: t2("role.deleteDescription", "Are you sure you want to delete this role? This action cannot be undone."),
        deleteButtonText: t2("role.deleteTitle", "Delete Role"),
        isProcessing
      }
    ),
    /* @__PURE__ */ jsx(
      PermissionDetailModal,
      {
        isOpen: isPermissionModalOpen,
        permission: selectedPermission,
        onClose: () => setIsPermissionModalOpen(false)
      }
    )
  ] });
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IngredientTable
}, Symbol.toStringTag, { value: "Module" }));
const RolesPage = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t2("role.pageTitle"),
        subtitle: t2("role.pageSubtitle")
      }
    ),
    /* @__PURE__ */ jsxs(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "dashboard", className: "opacity-60 hover:opacity-100", children: "Dashboard" }),
      /* @__PURE__ */ jsx("span", { children: t2("role.pageTitle") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(
      TitleCard,
      {
        header: t2("role.welcome"),
        description: t2("role.description")
      }
    ) }),
    /* @__PURE__ */ jsx(IngredientTable, {})
  ] }) });
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RolesPage
}, Symbol.toStringTag, { value: "Module" }));
const UserPage = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t2("global.user"),
        subtitle: t2("user.pageSubtitle")
      }
    ),
    /* @__PURE__ */ jsxs(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "dashboard", className: "opacity-60 hover:opacity-100", children: "Dashboard" }),
      /* @__PURE__ */ jsx("span", { children: t2("global.user") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(
        TitleCard,
        {
          header: t2("user.welcome"),
          description: t2("user.description")
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: `Total ${t2("global.user")}`,
          value: usePage().props.userCount || "0",
          icon: UserGroupIcon
        }
      )
    ] }),
    /* @__PURE__ */ jsx(UserTable, {})
  ] }) });
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserPage
}, Symbol.toStringTag, { value: "Module" }));
const BannerInput = ({
  label,
  name,
  value,
  error,
  onChange
}) => {
  const { t: t2 } = useTranslation();
  const inputRef = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (onChange) onChange(file, ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      if (onChange) onChange(null, "");
    }
  };
  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (onChange) onChange(null, "");
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm mb-1 font-semibold", children: label }),
    !value ? /* @__PURE__ */ jsxs("label", { className: "relative flex items-center w-full border border-gray-200 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600 cursor-pointer", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center mr-2", children: /* @__PURE__ */ jsx("img", { src: "/assets/icons/upload.svg", alt: "Upload Icon", className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-500 bg-gray-300 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer", children: "Pilih File" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept: "image/*",
          name,
          onChange: handleFileChange,
          className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "ml-4 text-xs text-gray-400 select-none pointer-events-none", children: t2("global.noFileSelected") })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-gray-300 rounded-md p-2 text-xs text-green-600", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center mr-2", children: /* @__PURE__ */ jsx("img", { src: "/assets/icons/upload.svg", alt: "Upload Icon", className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("span", { className: "flex-1", children: t2("global.fileUploaded") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "text-red-600 hover:text-red-800 ml-2",
          title: "Hapus file",
          onClick: handleRemove,
          children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 inline", fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    value && /* @__PURE__ */ jsx(
      "img",
      {
        src: value,
        alt: `Preview ${label}`,
        className: "mt-2 rounded shadow max-h-32"
      }
    ),
    error && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm mt-1", children: error })
  ] });
};
const BannerUpload = ({ label, onFileChange, imagePreview }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState$1(imagePreview || null);
  useEffect$1(() => {
    setPreview(imagePreview || null);
  }, [imagePreview]);
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file tidak boleh lebih dari 2MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      if (onFileChange) {
        onFileChange(file, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `w-full h-56 rounded-xl flex items-center justify-center bg-gray-600 text-white font-bold text-center relative overflow-hidden ${preview ? "bg-cover bg-center" : ""}`,
        style: {
          backgroundImage: preview ? `url(${preview})` : "none"
        },
        onClick: handleChooseFile,
        children: [
          !preview && /* @__PURE__ */ jsx("span", { className: "z-10 pointer-events-none", children: label }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              ref: fileInputRef,
              onChange: handleFileChange,
              className: "hidden"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: handleChooseFile,
        className: "px-4 py-1 bg-gray-300 rounded-md font-semibold hover:bg-gray-400",
        children: preview ? "Ganti Gambar" : "Choose File"
      }
    ) })
  ] });
};
const BannerEvent = ({
  label,
  name,
  onChange,
  header = "",
  text = "",
  link = "",
  imagePreview = "",
  onFieldChange,
  errors = {}
}) => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: label }),
    /* @__PURE__ */ jsx(
      BannerUpload,
      {
        label,
        imagePreview,
        onFileChange: (file, preview) => onChange({ name, file, preview })
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: `header_${name}`, value: "Header" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: `header_${name}`,
          name: `header_${name}`,
          value: header,
          onChange: onFieldChange,
          className: "mt-1 block w-full",
          autoComplete: `header_${name}`,
          placeholder: t2("setting.bannerEventHeaderPlaceholder"),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors[`header_${name}`], className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: `text_${name}`, value: "Text" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: `text_${name}`,
          name: `text_${name}`,
          value: text,
          onChange: onFieldChange,
          className: "mt-1 block w-full",
          autoComplete: `text_${name}`,
          placeholder: t2("setting.bannerEventTextPlaceholder"),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors[`text_${name}`], className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: `link_${name}`, value: "Link" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: `link_${name}`,
          name: `link_${name}`,
          value: link,
          onChange: onFieldChange,
          className: "mt-1 block w-full",
          autoComplete: `link_${name}`,
          pattern: "https://.*",
          title: "Link harus diawali dengan https://",
          placeholder: "https://example.com",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors[`link_${name}`], className: "mt-2" })
    ] })
  ] });
};
const defaultBanners = [
  { label: "Makanan", bg: "bg-gradient-to-r from-yellow-400 to-[#D9B36A]" },
  { label: "Minuman", bg: "bg-gradient-to-r from-blue-300 to-blue-500" },
  { label: "Kudapan", bg: "bg-gradient-to-r from-green-300 to-green-500" }
];
const zoomOut = (slider) => {
  function scale() {
    slider.slides.forEach((slide, idx) => {
      const abs = Math.abs(slider.track.details.rel - idx);
      slide.style.transform = `scale(${1 - abs * 0.15})`;
    });
  }
  slider.on("detailsChanged", scale);
  slider.on("created", scale);
};
const HomeCarousel = ({ previewBanners = [], isPreview = false }) => {
  const pageBanners = (usePage().props.banners || []).filter((b) => b.type === "hero");
  let banners = [];
  if (isPreview && previewBanners.length > 0) {
    banners = defaultBanners.map((def) => {
      const found = previewBanners.find((pb) => pb.label === def.label);
      return found ? { ...def, ...found } : def;
    });
  } else {
    banners = pageBanners.length > 0 ? pageBanners : defaultBanners;
  }
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.2, spacing: 24 },
    mode: "free-snap",
    renderMode: "performance",
    created() {
      autoSwitch();
    },
    slideChanged() {
      autoSwitch();
    }
  }, [zoomOut]);
  const timeout = useRef();
  const autoSwitch = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3e3);
  };
  useEffect$1(() => {
    autoSwitch();
    return () => clearTimeout(timeout.current);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative px-2 py-2", children: [
    /* @__PURE__ */ jsx("div", { ref: sliderRef, className: "keen-slider rounded-xl md:h-[320px] h-[160px]", children: banners.map((banner, idx) => /* @__PURE__ */ jsx(
      Link,
      {
        href: isPreview ? "#" : banner.link || (banner.label ? route("home.search", { category: banner.label }) : "#"),
        target: banner.link && banner.link !== "#" ? "_blank" : void 0,
        rel: banner.link && banner.link !== "#" ? "noopener noreferrer" : void 0,
        className: "keen-slider__slide flex justify-center items-center rounded-xl overflow-hidden ",
        style: { minWidth: 0 },
        children: banner.image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: isPreview ? banner.image : getImageUrl(banner.image, banner.title),
            alt: banner.title || banner.label,
            className: "w-full h-40 md:h-80 object-cover rounded-xl transition-transform duration-500"
          }
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-full h-40 md:h-80 flex justify-center items-center rounded-xl text-3xl font-bold text-[#0E1C2D] ${banner.bg}`,
            children: banner.title || banner.label
          }
        )
      },
      banner.id || idx
    )) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-2", children: banners.map((_, idx) => {
      var _a, _b, _c;
      return /* @__PURE__ */ jsx(
        "button",
        {
          className: `w-3 h-3 rounded-full transition-colors duration-300 ${((_c = (_b = (_a = instanceRef.current) == null ? void 0 : _a.track) == null ? void 0 : _b.details) == null ? void 0 : _c.rel) === idx ? "bg-[#D9B36A]" : "bg-white opacity-60"}`,
          onClick: () => {
            var _a2;
            return (_a2 = instanceRef.current) == null ? void 0 : _a2.moveToIdx(idx);
          },
          "aria-label": `Go to slide ${idx + 1}`,
          type: "button"
        },
        idx
      );
    }) })
  ] });
};
const eventKeys = ["event1", "event2", "event3", "event4"];
const bannerSlider = ["Our Choice", "Recommendation"];
const bannerMain = ["Makanan", "Minuman", "Kudapan"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const BannerPage = ({ banners }) => {
  const { t: t2 } = useTranslation();
  const getImageUrl2 = (title) => {
    const banner = banners == null ? void 0 : banners.find((b) => b.title === title);
    if (banner == null ? void 0 : banner.image) {
      const parts = banner.image.split("/");
      const filename = encodeURIComponent(parts.pop());
      return `/storage/${parts.join("/")}/${filename}`;
    }
    return "";
  };
  const initializeBannerMainPreview = () => bannerMain.map((label) => ({
    label,
    image: getImageUrl2(`banner_${label.toLowerCase()}`)
  }));
  const initializeSliderPreview = () => bannerSlider.map((label) => {
    const key = label.toLowerCase().replace(/\s+/g, "_");
    return {
      label,
      key,
      // TAMBAHKAN: key untuk mapping
      image: getImageUrl2(`banner_${key}`)
      // PERBAIKI: tambahkan 'banner_' prefix
    };
  });
  const initializeEventData = () => {
    const result = {};
    eventKeys.forEach((key) => {
      const banner = (banners == null ? void 0 : banners.find((b) => b.title === key)) || {};
      result[key] = {
        file: null,
        header: banner.header || "",
        text: banner.text || "",
        link: banner.link || "",
        imagePreview: getImageUrl2(key)
      };
    });
    return result;
  };
  const [previewBanners, setPreviewBanners] = useState$1(initializeBannerMainPreview);
  const [sliderPreview, setSliderPreview] = useState$1(initializeSliderPreview);
  const [eventBanners, setEventBanners] = useState$1(initializeEventData);
  const { data, setData, processing, errors, reset } = useForm({
    ...Object.fromEntries(bannerMain.map((label) => [`banner_${label.toLowerCase()}`, null])),
    // PERBAIKI: slider data initialization
    ...Object.fromEntries(bannerSlider.map((label) => {
      var _a;
      const key = label.toLowerCase().replace(/\s+/g, "_");
      return [key, ((_a = banners == null ? void 0 : banners.find((b) => b.title === `banner_${key}`)) == null ? void 0 : _a.image) || null];
    })),
    ...Object.fromEntries(eventKeys.flatMap((key) => {
      var _a, _b, _c;
      return [
        [`header_${key}`, ((_a = banners == null ? void 0 : banners.find((b) => b.title === key)) == null ? void 0 : _a.header) || ""],
        [`text_${key}`, ((_b = banners == null ? void 0 : banners.find((b) => b.title === key)) == null ? void 0 : _b.text) || ""],
        [`link_${key}`, ((_c = banners == null ? void 0 : banners.find((b) => b.title === key)) == null ? void 0 : _c.link) || ""]
      ];
    })),
    ...Object.fromEntries(eventKeys.map((key) => [key, null]))
  });
  useEffect$1(() => {
    setPreviewBanners(initializeBannerMainPreview());
    setSliderPreview(initializeSliderPreview());
    setEventBanners(initializeEventData());
  }, [banners]);
  const handleBannerMainChange = (label, file, preview) => {
    const name = `banner_${label.toLowerCase()}`;
    setPreviewBanners(
      (prev) => prev.map((item) => item.label === label ? { ...item, image: preview } : item)
    );
    setData(name, file);
  };
  const isFileValid = (file) => {
    return file && file.size <= MAX_FILE_SIZE;
  };
  const handleSliderChange = (label, file, preview) => {
    const key = label.toLowerCase().replace(/\s+/g, "_");
    setSliderPreview(
      (prev) => prev.map((item) => item.key === key ? { ...item, image: preview } : item)
      // PERBAIKI: gunakan item.key
    );
    setData(key, file);
  };
  const handleEventChange = ({ name, file, preview }) => {
    setEventBanners((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        file,
        imagePreview: preview
      }
    }));
    setData(name, file || null);
  };
  const handleEventFieldChange = (e) => {
    const { name, value } = e.target;
    const [field, key] = name.split("_");
    setEventBanners((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
    setData(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isBannerMainValid = bannerMain.every(
      (label) => {
        var _a;
        return (_a = previewBanners.find((b) => b.label === label)) == null ? void 0 : _a.image;
      }
    );
    const isEvent12Valid = ["event1", "event2"].every(
      (key) => eventBanners[key].file || eventBanners[key].imagePreview
    );
    if (!isBannerMainValid || !isEvent12Valid) {
      Swal$1.fire({
        icon: "info",
        title: "Lengkapi Gambar",
        text: "Minimal semua banner utama dan event 1 & 2 harus diisi sebelum submit."
      });
      return;
    }
    const allFiles = [
      ...bannerMain.map((b) => data[`banner_${b.toLowerCase()}`]),
      ...bannerSlider.map((s) => {
        const key = s.toLowerCase().replace(/\s+/g, "_");
        return data[key];
      }),
      ...eventKeys.map((k) => data[k])
    ].filter(Boolean);
    const largeFiles = allFiles.filter((file) => file && !isFileValid(file));
    if (largeFiles.length > 0) {
      Swal$1.fire({
        icon: "error",
        title: "File Terlalu Besar",
        text: `Ukuran file tidak boleh melebihi ${MAX_FILE_SIZE_MB}MB.`
      });
      return;
    }
    const firstBatch = new FormData();
    const secondBatch = new FormData();
    const keys = Object.keys(data);
    const midpoint = Math.ceil(keys.length / 2);
    keys.forEach((key, i) => {
      const value = data[key];
      const batch = i < midpoint ? firstBatch : secondBatch;
      if (value !== null && (value instanceof File || typeof value === "string")) {
        batch.append(key, value);
      }
    });
    const uploadBatch = async (batch, step) => {
      return new Promise((resolve, reject) => {
        Swal$1.fire({
          title: `Mengupload bagian ${step}...`,
          html: "Mohon tunggu sebentar.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal$1.showLoading();
          }
        });
        router.post("/admin/setting", batch, {
          forceFormData: true,
          onSuccess: () => {
            Swal$1.close();
            resolve();
          },
          onError: () => {
            Swal$1.fire({ icon: "error", title: `Gagal upload bagian ${step}` });
            reject();
          }
        });
      });
    };
    try {
      await uploadBatch(firstBatch, 1);
      await uploadBatch(secondBatch, 2);
      reset();
      Swal$1.fire({ icon: "success", title: "Semua data berhasil diunggah!" });
    } catch (e2) {
    }
  };
  console.log("Banner Debug:", {
    sliderPreview,
    data,
    errors
  });
  return /* @__PURE__ */ jsxs("form", { className: "p-4 space-y-6", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: bannerMain.map((label, index) => /* @__PURE__ */ jsx(
        BannerInput,
        {
          label: `Banner ${label}`,
          name: `banner_${label.toLowerCase()}`,
          value: previewBanners[index].image,
          error: errors[`banner_${label.toLowerCase()}`],
          onChange: (file, preview) => handleBannerMainChange(label, file, preview)
        },
        label
      )) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(HomeCarousel, { isPreview: true, previewBanners }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: sliderPreview.map(({ label, key, image }, index) => /* @__PURE__ */ jsx(
      BannerInput,
      {
        label: `Banner ${label}`,
        name: key,
        value: image,
        error: errors[key],
        onChange: (file, preview) => handleSliderChange(label, file, preview)
      },
      key
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: eventKeys.map((key, index) => /* @__PURE__ */ jsx(
      BannerEvent,
      {
        label: `Event ${index + 1}`,
        name: key,
        onChange: handleEventChange,
        header: eventBanners[key].header,
        text: eventBanners[key].text,
        link: eventBanners[key].link,
        imagePreview: eventBanners[key].imagePreview,
        onFieldChange: handleEventFieldChange
      },
      key
    )) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "bg-[#D9B36A] text-[#0E1C2D] hover:bg-[#caa45f] rounded-md w-full px-4 py-1.5 text-lg font-semibold transition",
        disabled: processing,
        children: t2("global.save")
      }
    )
  ] });
};
const SystemSettingPage = () => {
  const banners = usePage().props.banners || [];
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t2("setting.pageTitle"),
        subtitle: t2("setting.pageSubtitle")
      }
    ),
    /* @__PURE__ */ jsxs(Breadcrumbs, { className: "bg-slate-800 p-2 rounded-md text-white mb-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "dashboard", className: "opacity-60 hover:opacity-100", children: "Dashboard" }),
      /* @__PURE__ */ jsx("span", { children: t2("setting.pageTitle") })
    ] }),
    /* @__PURE__ */ jsx(BannerPage, { banners })
  ] }) });
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SystemSettingPage
}, Symbol.toStringTag, { value: "Module" }));
function StepLayout({ title, subtitle, children }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.4 },
      className: "bg-white rounded-2xl shadow-xl p-10 max-w-3xl w-full",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 mb-2", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-slate-500 mb-6", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "text-slate-700 space-y-4", children })
      ]
    }
  );
}
function Step1() {
  return /* @__PURE__ */ jsxs(
    StepLayout,
    {
      icon: AcademicCapIcon,
      title: "Sistem Informasi Pemilihan Pembimbing",
      subtitle: "Jurusan Akuntansi - Politeknik Negeri Madiun",
      children: [
        /* @__PURE__ */ jsx("p", { children: "Sistem ini dirancang untuk mempermudah proses pemilihan pembimbing Tugas Akhir/Skripsi secara terstruktur, transparan, dan terdokumentasi." }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 p-4 rounded-xl text-center", children: [
            "👨‍🎓 ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Mahasiswa" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 p-4 rounded-xl text-center", children: [
            "🏢 ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Admin PRODI" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 p-4 rounded-xl text-center", children: [
            "👨‍🏫 ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Dosen" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 p-5 rounded-xl", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-blue-700", children: "Ketentuan Format Data" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "NIP / NIPPPK : 18 karakter" }),
            /* @__PURE__ */ jsx("li", { children: "NIM : 9 karakter" })
          ] })
        ] })
      ]
    }
  );
}
function Step2() {
  return /* @__PURE__ */ jsxs(
    StepLayout,
    {
      icon: UserGroupIcon,
      title: "Pahami Peran Anda",
      subtitle: "Setiap peran memiliki tanggung jawab berbeda",
      children: [
        /* @__PURE__ */ jsx("p", { children: "Sebelum masuk ke sistem, pastikan Anda memahami prosedur sesuai peran Anda." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-100 rounded-xl", children: [
            /* @__PURE__ */ jsx("strong", { children: "Mahasiswa" }),
            /* @__PURE__ */ jsx("p", { children: "Mengajukan dan memilih pembimbing." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-100 rounded-xl", children: [
            /* @__PURE__ */ jsx("strong", { children: "Admin PRODI" }),
            /* @__PURE__ */ jsx("p", { children: "Melakukan approval akun dan monitoring." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-100 rounded-xl", children: [
            /* @__PURE__ */ jsx("strong", { children: "Dosen" }),
            /* @__PURE__ */ jsx("p", { children: "Menyetujui atau menolak permintaan pembimbing." })
          ] })
        ] })
      ]
    }
  );
}
function Step3() {
  return /* @__PURE__ */ jsxs(
    StepLayout,
    {
      icon: UserIcon,
      title: "Panduan Mahasiswa",
      subtitle: "Ikuti langkah berikut untuk memilih pembimbing",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-5 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "1️⃣ Pembuatan Akun" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Klik tombol Buat Akun Baru" }),
            /* @__PURE__ */ jsx("li", { children: "Isi seluruh data dengan benar" }),
            /* @__PURE__ */ jsx("li", { children: "Hubungi Admin PRODI untuk approval" }),
            /* @__PURE__ */ jsx("li", { children: "Login setelah akun disetujui" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 p-5 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "2️⃣ Pengajuan Pembimbing" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Klik Buat Permintaan" }),
            /* @__PURE__ */ jsx("li", { children: "Isi judul dan pilih pembimbing" }),
            /* @__PURE__ */ jsx("li", { children: "Klik Simpan" }),
            /* @__PURE__ */ jsx("li", { children: "Pantau status secara berkala" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-5 rounded-xl", children: /* @__PURE__ */ jsx("p", { children: "Jika ditolak → Ajukan ulang Jika disetujui → Cetak bukti persetujuan" }) })
      ]
    }
  );
}
function Step4() {
  return /* @__PURE__ */ jsx(
    StepLayout,
    {
      icon: BuildingOfficeIcon,
      title: "Panduan Admin PRODI",
      children: /* @__PURE__ */ jsx("div", { className: "bg-slate-100 p-5 rounded-xl", children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6", children: [
        /* @__PURE__ */ jsx("li", { children: "Membuat akun dan menunggu approval" }),
        /* @__PURE__ */ jsx("li", { children: "Melakukan approval akun mahasiswa" }),
        /* @__PURE__ */ jsx("li", { children: "Monitoring pengajuan pembimbing" }),
        /* @__PURE__ */ jsx("li", { children: "Memastikan proses berjalan sesuai aturan" })
      ] }) })
    }
  );
}
function Step5() {
  return /* @__PURE__ */ jsxs(
    StepLayout,
    {
      icon: CheckBadgeIcon,
      title: "Panduan Dosen",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 p-5 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Approval Pembimbing" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Login ke sistem" }),
            /* @__PURE__ */ jsx("li", { children: "Periksa daftar pengajuan mahasiswa" }),
            /* @__PURE__ */ jsx("li", { children: "Klik Setujui atau Tolak" }),
            /* @__PURE__ */ jsx("li", { children: "Berikan alasan jika menolak" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-5 rounded-xl", children: "Setelah masa pengajuan selesai, Anda dapat mencetak rekapitulasi mahasiswa bimbingan." })
      ]
    }
  );
}
const STORAGE_KEY = "hide_onboarding";
function OnboardingModal() {
  const [step, setStep] = useState$1(1);
  const [show, setShow] = useState$1(false);
  const [dontShowAgain, setDontShowAgain] = useState$1(false);
  useEffect$1(() => {
    const hidden = localStorage.getItem(STORAGE_KEY);
    if (!hidden) setShow(true);
  }, []);
  if (!show) return null;
  const totalSteps = 5;
  const progress = step / totalSteps * 100;
  const next = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      if (dontShowAgain) {
        localStorage.setItem(STORAGE_KEY, "true");
      }
      setShow(false);
    }
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return /* @__PURE__ */ jsx(Step1, {}, "s1");
      case 2:
        return /* @__PURE__ */ jsx(Step2, {}, "s2");
      case 3:
        return /* @__PURE__ */ jsx(Step3, {}, "s3");
      case 4:
        return /* @__PURE__ */ jsx(Step4, {}, "s4");
      case 5:
        return /* @__PURE__ */ jsx(Step5, {}, "s5");
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col z-50 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-6 flex-shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white/30 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-white h-2 transition-all duration-500",
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "text-white text-sm mt-2 font-medium", children: [
        "Langkah ",
        step,
        " dari ",
        totalSteps
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-4 md:px-6 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-2xl h-full", children: renderStep() }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border-t border-slate-200 p-4 md:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-shrink-0", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500",
            checked: dontShowAgain,
            onChange: (e) => setDontShowAgain(e.target.checked)
          }
        ),
        "Jangan tampilkan lagi"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prev,
            disabled: step === 1,
            className: "flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-medium disabled:opacity-50 transition active:scale-95",
            children: "Sebelumnya"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: next,
            className: "flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95",
            children: step === totalSteps ? "Selesai" : "Selanjutnya"
          }
        )
      ] })
    ] })
  ] });
}
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(OnboardingModal, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg", children })
    ] })
  ] });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const LoginGoogleButton = () => {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: "/auth/google",
      type: "button",
      className: "px-4 py-2 border flex align-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "w-6 h-6",
            src: "https://www.svgrepo.com/show/475656/google-color.svg",
            loading: "lazy",
            alt: "google logo"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-slate-700", children: t2("global.loginWithGoogle") })
      ]
    }
  );
};
function Login({ status }) {
  const { t: t2 } = useTranslation();
  const [mode, setMode] = useState$1("login");
  const [studyPrograms, setStudyPrograms] = useState$1([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    nim: "",
    study_program_id: "",
    email: "",
    password: "",
    password_confirmation: "",
    remember: false
  });
  useEffect$1(() => {
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      var _a;
      setStudyPrograms(((_a = result.data) == null ? void 0 : _a.studyPrograms) || []);
    }).catch(() => {
      Swal$1.fire("Error!", "Gagal mengambil data prodi", "error");
    });
  }, []);
  const studyProgramOptions = studyPrograms.map((sp) => ({
    value: sp.id,
    label: `${sp.code} - ${sp.name}`
  }));
  const submit = (e) => {
    e.preventDefault();
    const routeName = mode === "login" ? "login" : "register";
    post(route(routeName), {
      onSuccess: (page) => {
        var _a;
        Swal$1.fire({
          icon: "success",
          title: "Sukses",
          text: ((_a = page.props) == null ? void 0 : _a.status) ?? "Berhasil login"
        });
        reset("password", "password_confirmation");
      },
      onError: (errors2) => {
        const firstError = Object.values(errors2)[0];
        Swal$1.fire({
          icon: "error",
          title: t2("global.swalError"),
          text: firstError || t2("global.failedProcess")
        });
      },
      onFinish: () => {
        reset("password", "password_confirmation");
      }
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg border border-green-200 bg-green-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "text-green-600 text-lg", children: "✓" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-green-800", children: t2("global.success") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700 mt-1", children: status })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("form", { className: "space-y-6 py-10 px-6 pb-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-gray-900", children: mode === "login" ? t2("global.loginTitle") : t2("global.createAccountTitle") }),
      mode === "register" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "NIM" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "nim",
              value: data.nim,
              onChange: (e) => setData("nim", e.target.value),
              className: "w-full",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.nim })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name") }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              className: "w-full",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Program Studi" }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              options: studyProgramOptions,
              value: studyProgramOptions.find((o) => o.value === data.study_program_id) || null,
              onChange: (opt) => setData("study_program_id", (opt == null ? void 0 : opt.value) || ""),
              placeholder: "Pilih Prodi",
              isClearable: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.study_program_id })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t2("global.email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "email",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            className: "w-full",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t2("global.password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "w-full",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password })
      ] }),
      mode === "register" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { value: t2("global.confirmPassword") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            className: "w-full",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: t2("global.rememberMe") })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full px-4 py-2 bg-[#0E1C2D] text-white rounded-lg flex justify-center items-center gap-2 hover:text-[#D9B36A]",
          children: [
            processing && /* @__PURE__ */ jsx(Spinner, { className: "h-4 w-4" }),
            processing ? t2("global.processing") : mode === "login" ? t2("global.login") : t2("global.register")
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500", children: mode === "login" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        t2("global.notRegistered"),
        "?",
        " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-blue-700",
            onClick: () => setMode("register"),
            children: t2("global.createAccount")
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        t2("global.alreadyHaveAccount"),
        "?",
        " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-blue-700",
            onClick: () => setMode("login"),
            children: t2("global.login")
          }
        )
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const [studyPrograms, setStudyPrograms] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    nim: "",
    name: "",
    study_program_id: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  useEffect(() => {
    if (!isOpen) return;
    fetch("/study-program/select-data").then((res) => res.json()).then((result) => {
      setStudyPrograms(result.data.studyPrograms || []);
    }).catch(() => {
      Swal.fire("Error!", "Gagal mengambil data", "error");
    });
  }, [isOpen]);
  const studyProgramOptions = studyPrograms.map((studyProgram) => ({
    value: studyProgram.id,
    label: `${studyProgram.code} - ${studyProgram.name}`
  }));
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "nim", value: "Nim" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "nim",
            name: "nim",
            value: data.nim,
            className: "mt-1 block w-full",
            autoComplete: "nim",
            isFocused: true,
            onChange: (e) => setData("nim", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.nim, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "study_program", value: "Program Studi", required: true }),
        /* @__PURE__ */ jsx(
          Select,
          {
            options: studyProgramOptions,
            id: "study_program_id",
            name: "study_program_id",
            value: studyProgramOptions.find((option) => option.value === data.study_program_id) || null,
            onChange: (selectedOption) => {
              setData("study_program_id", selectedOption ? selectedOption.value : "");
            },
            placeholder: "Pilih Prodi",
            isClearable: true,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.study_program, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard() {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "Tabel" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const FoodList = ({ isLoggedIn }) => {
  const [foods, setFoods] = useState$1([]);
  const [search, setSearch] = useState$1("");
  const [filteredFoods, setFilteredFoods] = useState$1([]);
  const [selectedCategories, setSelectedCategories] = useState$1([]);
  const [selectedIngredients, setSelectedIngredients] = useState$1([]);
  const [recommendedFoods, setRecommendedFoods] = useState$1([]);
  const [loading, setLoading] = useState$1(false);
  const [error, setError] = useState$1(null);
  useEffect$1(() => {
    const storedPreferences = JSON.parse(localStorage.getItem("preferences")) || { categories: [], ingredients: [] };
    setSelectedCategories(storedPreferences.categories);
    setSelectedIngredients(storedPreferences.ingredients);
    const excludedFoods = JSON.parse(sessionStorage.getItem("excludedFoods")) || [];
    const availableFoods = foods.filter((food) => !excludedFoods.includes(food.id));
    setRecommendedFoods(availableFoods.length > 0 ? availableFoods : foods);
  }, [foods]);
  useEffect$1(() => {
    if (!search.trim()) {
      setFilteredFoods([]);
      return;
    }
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedPreferences = JSON.parse(localStorage.getItem("preferences")) || {};
        const response = await axios$1.get("/get-foods", {
          params: {
            search,
            categories: storedPreferences.categories || [],
            ingredients: storedPreferences.ingredients || []
          }
        });
        setFilteredFoods(response.data);
      } catch (err) {
        setError("Error fetching foods. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    const debounceFetch = setTimeout(fetchFoods, 800);
    return () => clearTimeout(debounceFetch);
  }, [search]);
  const displayedFoods = useMemo(() => {
    return search.trim() ? filteredFoods : recommendedFoods;
  }, [search, filteredFoods, recommendedFoods]);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl p-5", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Search for food...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        className: "w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring focus:ring-blue-400"
      }
    ),
    loading && /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-gray-500", children: "Loading..." }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-red-500", children: error }),
    /* @__PURE__ */ jsx("div", { className: "mt-5 grid grid-cols-1 gap-5 md:grid-cols-2", children: displayedFoods.length > 0 ? displayedFoods.map((food) => /* @__PURE__ */ jsx(
      Link,
      {
        href: route("foods.show", { id: food.id }),
        className: "block",
        children: /* @__PURE__ */ jsxs("div", { className: "flex overflow-hidden rounded-lg bg-white shadow-md transition hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `/images/${food.image}`,
              alt: food.name,
              className: "h-32 w-32 object-cover"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-600 hover:underline", children: food.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              food.description ? food.description.substring(0, 50) : "",
              "..."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 font-bold text-green-600", children: [
              "Rp ",
              food.price
            ] })
          ] })
        ] })
      },
      food.id
    )) : !loading && /* @__PURE__ */ jsx("p", { className: "col-span-2 text-center text-gray-500", children: "No food found." }) })
  ] });
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FoodList
}, Symbol.toStringTag, { value: "Module" }));
function AuthModal({ isOpen: isOpen2, onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState$1(defaultMode);
  const { t: t2, i18n } = useTranslation();
  useEffect$1(() => {
    setMode(defaultMode);
  }, [defaultMode]);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    remember: false
  });
  const close2 = () => {
    setMode("login");
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      onFinish: () => reset("password"),
      headers: {
        "X-Locale": i18n.language
      }
    };
    if (mode === "login") {
      post(route("login"), options);
    } else {
      post(route("register"), options);
    }
  };
  return /* @__PURE__ */ jsx(Transition, { show: isOpen2, as: Fragment$1, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed w-full inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close2,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            className: "w-full sm:max-w-md mx-auto transform overflow-hidden rounded-lg bg-white shadow-xl transition-all",
            children: /* @__PURE__ */ jsxs(
              Dialog.Panel,
              {
                className: "mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full max-w-md",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex justify-end p-2", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5",
                      onClick: close2,
                      children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-5 h-5" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("form", { className: "space-y-6 px-6 pb-6", onSubmit: handleSubmit, children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-gray-900", children: mode === "login" ? t2("global.loginTitle") : t2("global.createAccountTitle") }),
                    mode === "register" && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-sm font-medium text-gray-900 block mb-2", children: t2("global.name") }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "name",
                          type: "text",
                          value: data.name,
                          onChange: (e) => setData("name", e.target.value),
                          required: true,
                          className: "w-full",
                          placeholder: t2("global.name")
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.name })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm font-medium text-gray-900 block mb-2", children: t2("global.email") }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "email",
                          type: "email",
                          value: data.email,
                          onChange: (e) => setData("email", e.target.value),
                          required: true,
                          className: "w-full",
                          placeholder: "Email"
                        }
                      ),
                      errors.email && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.email })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "text-sm font-medium text-gray-900 block mb-2", children: t2("global.password") }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "password",
                          type: "password",
                          value: data.password,
                          onChange: (e) => setData("password", e.target.value),
                          required: true,
                          className: "w-full",
                          placeholder: "Password"
                        }
                      ),
                      errors.password && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.password })
                    ] }),
                    mode === "register" && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "password_confirmation", className: "text-sm font-medium text-gray-900 block mb-2", children: t2("global.confirmPassword") }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "password_confirmation",
                          type: "password",
                          value: data.password_confirmation,
                          onChange: (e) => setData("password_confirmation", e.target.value),
                          required: true,
                          className: "w-full",
                          placeholder: t2("global.confirmPassword")
                        }
                      ),
                      errors.password_confirmation && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.password_confirmation })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(
                        Checkbox,
                        {
                          name: "remember",
                          checked: data.remember,
                          onChange: (e) => setData("remember", e.target.checked)
                        }
                      ),
                      /* @__PURE__ */ jsx("label", { htmlFor: "remember", className: "ml-2 text-sm text-gray-900", children: t2("global.rememberMe") })
                    ] }) }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "submit",
                        className: "w-full px-4 py-2 border bg-[#0E1C2D] align-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-[#D9B36A] hover:shadow transition duration-150 flex items-center",
                        disabled: processing,
                        children: [
                          processing && /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsx(Spinner, { className: "h-4 w-4 animate-spin" }) }),
                          processing ? t2("global.processing") : mode === "login" ? t2("global.login") : t2("global.register")
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(LoginGoogleButton, {}),
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 text-center", children: mode === "login" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      t2("global.notRegistered"),
                      "?",
                      " ",
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-blue-700 hover:underline",
                          onClick: () => setMode("register"),
                          children: t2("global.createAccount")
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      t2("global.alreadyHaveAccount"),
                      "?",
                      " ",
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-blue-700 hover:underline",
                          onClick: () => setMode("login"),
                          children: t2("global.login")
                        }
                      )
                    ] }) })
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  ) });
}
const SearchBar = ({ placeholder = "Cari Produk..." }) => {
  const [search, setSearch] = useState$1("");
  const [suggestions, setSuggestions] = useState$1([]);
  const [showSuggestions, setShowSuggestions] = useState$1(false);
  const debounceRef = useRef(null);
  const storedPreferences = JSON.parse(localStorage.getItem("preferences"));
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearchRequest(value);
    }, 400);
  };
  const handleSearchRequest = async (query) => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await axios$1.get("/api/get-suggestion", {
        params: {
          search: query,
          categories: storedPreferences.categories,
          ingredients: storedPreferences.ingredients
        }
      });
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const handleSearchSubmit = (value = search) => {
    router.get("/api/search", { search: value });
  };
  const handleSuggestionClick = (item) => {
    const value = item.name || item.title || "";
    setSearch(value);
    setShowSuggestions(false);
    router.get(`/product/${item.id}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      handleSearchSubmit();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        "aria-label": "Cari Produk",
        className: "w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow",
        placeholder,
        type: "text",
        value: search,
        onChange: handleSearchChange,
        onFocus: () => search && suggestions.length > 0 && setShowSuggestions(true),
        onKeyDown: handleKeyDown,
        autoComplete: "off"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "Search button",
        className: "absolute top-1 right-1 flex items-center rounded py-1 px-2.5 border border-transparent text-center text-sm text-white",
        type: "button",
        onClick: () => handleSearchSubmit(),
        children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5 text-gray-400" })
      }
    ),
    showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsx("ul", { children: suggestions.map((item) => /* @__PURE__ */ jsx(
      "li",
      {
        className: "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm",
        onClick: () => handleSuggestionClick(item),
        children: item.name || item.title
      },
      item.id
    )) }) })
  ] });
};
function AvatarDropdown({ className }) {
  var _a;
  const { auth } = usePage().props;
  const [isOpen2, setIsOpen] = useState$1(false);
  const dropdownRef = useRef();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect$1(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!(auth == null ? void 0 : auth.user)) return null;
  return /* @__PURE__ */ jsxs("div", { className: `relative ${className || ""}`, ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-expanded": isOpen2,
        "aria-haspopup": "true",
        onClick: toggleDropdown,
        className: "flex items-center space-x-2 focus:outline-none rounded-md",
        id: "user-menu-button",
        children: [
          /* @__PURE__ */ jsx(Avatar, { imagePath: auth.user.photo_profile, name: (_a = auth.user) == null ? void 0 : _a.name }),
          /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-sm select-none", children: auth.user.name }),
          /* @__PURE__ */ jsx(
            "i",
            {
              className: `fas ${isOpen2 ? "fa-chevron-up" : "fa-chevron-down"} text-gray-500 text-xs`
            }
          )
        ]
      }
    ),
    isOpen2 && /* @__PURE__ */ jsxs(
      "div",
      {
        "aria-labelledby": "user-menu-button",
        "aria-orientation": "vertical",
        className: "absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10",
        role: "menu",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-gray-100", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-semibold text-sm", children: auth.user.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs truncate", children: auth.user.email })
          ] }),
          auth.user.canAccessDashboard && /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("admin.dashboard.index"), children: "Dashboard" }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: t("global.profile") }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("home.getFavorites"), children: t("global.favorite") }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { method: "post", href: route("logout"), as: "button", children: "Logout" })
        ]
      }
    )
  ] });
}
function Navbar() {
  var _a;
  const { t: t2 } = useTranslation();
  const { auth } = usePage().props;
  const [showAuthModal, setShowAuthModal] = useState$1(false);
  const [authMode, setAuthMode] = useState$1("login");
  return /* @__PURE__ */ jsx("header", { className: "w-full bg-[#0E1C2D] border-b border-[#D9B36A] sticky top-0 z-[10]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { href: "/home", children: /* @__PURE__ */ jsx(ApplicationLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 mx-4", children: /* @__PURE__ */ jsx(SearchBar, { placeholder: t2("navbar.searchPlaceholder") }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(LanguageDropdown, {}),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/favorites",
            "aria-label": "Favorite items",
            className: "relative text-[#D9B36A] hover:text-white",
            children: [
              /* @__PURE__ */ jsx(HeartIcon, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 leading-none", children: ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.favorite_count) || 0 })
            ]
          }
        ),
        !(auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "border border-[#D9B36A] text-[#D9B36A] hover:bg-[#D9B36A] hover:text-[#0E1C2D] rounded-full px-4 py-1.5 text-sm transition",
              onClick: () => {
                setAuthMode("login");
                setShowAuthModal(true);
              },
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowRightStartOnRectangleIcon, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: t2("navbar.login") })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "bg-[#D9B36A] text-[#0E1C2D] hover:bg-[#caa45f] rounded-full px-4 py-1.5 text-sm font-semibold transition",
              onClick: () => {
                setAuthMode("register");
                setShowAuthModal(true);
              },
              children: t2("navbar.register")
            }
          )
        ] }) : /* @__PURE__ */ jsx(AvatarDropdown, { className: "block" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-end gap-2 mt-2 lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(LanguageDropdown, {}),
      !(auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "border border-[#D9B36A] text-[#D9B36A] hover:bg-[#D9B36A] hover:text-[#0E1C2D] rounded-full px-4 py-1.5 text-sm transition",
            onClick: () => {
              setAuthMode("login");
              setShowAuthModal(true);
            },
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRightStartOnRectangleIcon, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsx("span", { children: t2("navbar.login") })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "bg-[#D9B36A] text-[#0E1C2D] hover:bg-[#caa45f] rounded-full px-4 py-1.5 text-sm font-semibold transition hidden lg:block",
            onClick: () => {
              setAuthMode("register");
              setShowAuthModal(true);
            },
            children: t2("navbar.register")
          }
        ),
        /* @__PURE__ */ jsx(
          AuthModal,
          {
            isOpen: showAuthModal,
            onClose: () => setShowAuthModal(false),
            defaultMode: authMode
          }
        )
      ] }) : /* @__PURE__ */ jsx(AvatarDropdown, { className: "block" })
    ] }) })
  ] }) });
}
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#0E1C2D] lg:block hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-[#D9B36A]" }) }),
        /* @__PURE__ */ jsxs(Typography, { className: "mt-4 max-w-xs text-[#D9B36A] text-sm leading-relaxed", children: [
          "Whistleblow adalah sebuah ruang kreatif berbasis budaya yang hadir setiap hari Ahad pagi di Desa Gunungsari, Madiun. Dikelola oleh komunitas lokal dan mendukung UMKM dan produk kreatif seperti ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "@lontar.craft" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-8 flex gap-6", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "https://www.instagram.com/pasarpundensari/",
            rel: "noreferrer",
            target: "_blank",
            className: "text-[#D9B36A] hover:text-white transition",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Instagram" }),
              /* @__PURE__ */ jsx(FaInstagram, { className: "w-6 h-6" })
            ]
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "font-medium text-[#D9B36A] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "w-5 h-5 text-[#C69C6D]" }),
            "Informasi"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-4 text-sm text-white", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "mt-1 text-[#C69C6D]" }),
              /* @__PURE__ */ jsx("span", { children: "Desa Gunungsari, Kec./Kab. Madiun" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(FaClock, { className: "mt-1 text-[#C69C6D]" }),
              /* @__PURE__ */ jsx("span", { children: "Buka: Ahad, 06.00 - 11.00 WIB" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(FaWhatsapp, { className: "mt-1 text-[#C69C6D]" }),
              /* @__PURE__ */ jsx("span", { children: "Admin: 0895-0215-5868 / 0878-3633-4432" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "mt-1 text-[#C69C6D]" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://maps.app.goo.gl/Fa5Mr5EhnqL5sSvx9",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "hover:text-[#D9B36A] transition",
                  children: "Google Maps Lokasi"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.9814886915083!2d111.54180629999999!3d-7.5769933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79bfb3db8c096b%3A0x3282e46b8c88693e!2sPasar%20Pundensari!5e0!3m2!1sid!2sid!4v1750051852648!5m2!1sid!2sid",
            width: "400",
            height: "250",
            style: { border: 0 },
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Typography, { className: "text-xs text-[#C69C6D] mt-10", children: [
      "© ",
      currentYear,
      ". Whistleblow. All rights reserved."
    ] })
  ] }) });
}
function BottomNav() {
  const { url } = usePage();
  const [path, setPath] = useState$1("/");
  useEffect$1(() => {
    setPath(new URL(url, window.location.origin).pathname);
  }, [url]);
  return /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-white border-t shadow-md lg:hidden z-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-around items-center py-2 text-xs", children: [
    /* @__PURE__ */ jsx(NavItem, { href: "/home", icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-6 h-6" }), label: "Beranda", active: path.startsWith("/home") }),
    /* @__PURE__ */ jsx(NavItem, { href: "/favorites", icon: /* @__PURE__ */ jsx(HeartIcon, { className: "w-6 h-6" }), label: "Favorit", active: path.startsWith("/favorites") }),
    /* @__PURE__ */ jsx(NavItem, { href: "/profile", icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-6 h-6" }), label: "Akun", active: path.startsWith("/profile") })
  ] }) });
}
function NavItem({ icon, label, active = false, badge, href = "#" }) {
  return /* @__PURE__ */ jsxs(Link, { href, className: `relative flex flex-col items-center text-center ${active ? "text-blue-600" : "text-gray-500"} hover:text-blue-600`, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      icon,
      typeof badge === "number" && badge > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center", children: badge })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-[11px] mt-1", children: label })
  ] });
}
function HomeLayout({ className, children }) {
  const { url } = usePage();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    url === "/home" && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-b from-white to-teal-100 py-2 mb-2", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(HomeCarousel, {}) }) }),
    /* @__PURE__ */ jsx(
      "main",
      {
        className: `max-w-7xl mx-auto space-y-8 pb-20 ${className}`,
        children
      }
    ),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(BottomNav, {})
  ] });
}
function FoodDetailBanner({ image1, image2, image3, alt = "Fruit Image" }) {
  const images = [image1, image2, image3].filter(Boolean);
  const imgRefs = useRef([]);
  const [bgGradient, setBgGradient] = useState$1(
    "linear-gradient(rgb(209, 220, 176), rgb(199, 211, 163))"
  );
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      if (slider.track && slider.track.details) {
        updateBg(slider.track.details.rel);
      }
    },
    created(slider) {
      if (slider.track && slider.track.details) {
        updateBg(slider.track.details.rel);
      }
    }
  });
  useEffect$1(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current.next();
    }, 3e3);
    return () => clearInterval(interval);
  }, [instanceRef]);
  const updateBg = (idx) => {
    const img = imgRefs.current[idx];
    if (!img) return;
    if (img.complete) {
      try {
        const colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 6);
        const brightness = (c) => c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
        palette = palette.filter((c) => brightness(c) > 180);
        palette.sort((a, b) => brightness(b) - brightness(a));
        const topColor = palette[0];
        if (topColor) {
          setBgGradient(
            `linear-gradient(rgb(${topColor.join(",")}), rgb(245,245,245))`
          );
        } else {
          setBgGradient(
            "linear-gradient(rgb(209, 220, 176), rgb(245,245,245))"
          );
        }
      } catch {
        setBgGradient(
          "linear-gradient(rgb(209, 220, 176), rgb(245,245,245))"
        );
      }
    } else {
      img.onload = () => updateBg(idx);
    }
  };
  useEffect$1(() => {
    setBgGradient("linear-gradient(rgb(209, 220, 176), rgb(199, 211, 163))");
  }, [image1, image2, image3]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex max-w-7xl mx-auto h-[60vh] items-center justify-center gap-8 transition-colors duration-500",
      style: { background: bgGradient },
      children: /* @__PURE__ */ jsx("div", { ref: sliderRef, className: "keen-slider", children: images.map((img, idx) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "keen-slider__slide px-5 aspect-[4/3] flex flex-col items-center justify-center relative",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              ref: (el) => imgRefs.current[idx] = el,
              src: getImageUrl(img),
              alt,
              className: "object-cover rounded-2xl w-[350px] h-[260px] transition-transform duration-300 hover:scale-105"
            }
          )
        },
        idx
      )) })
    }
  );
}
const ReviewCard = ({ review }) => /* @__PURE__ */ jsxs("article", { className: "flex space-x-4", children: [
  review.user.photo_profile ? /* @__PURE__ */ jsx(
    "img",
    {
      alt: review.user.name,
      className: "w-12 h-12 rounded-full object-cover",
      height: "48",
      src: review.user.photo_profile,
      width: "48"
    }
  ) : /* @__PURE__ */ jsx("div", { className: "relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600", children: /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600 dark:text-gray-300", children: review.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm mb-1", children: review.user.name }),
    /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-base mb-2", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(
      "i",
      {
        className: i < Math.round(review.rating) ? "fas fa-star" : "far fa-star text-gray-300"
      },
      i
    )) }),
    /* @__PURE__ */ jsx("p", { className: "italic text-sm text-gray-700 max-w-xl", children: review.comment })
  ] })
] });
function ReviewSkeleton() {
  return /* @__PURE__ */ jsx(Fragment, { children: Array.from({ length: 7 }).map((_, idx) => /* @__PURE__ */ jsxs("article", { className: "flex space-x-4 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2 py-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-24" }),
      /* @__PURE__ */ jsx("div", { className: "flex space-x-1", children: Array.from({ length: 5 }).map((_2, i) => /* @__PURE__ */ jsx("div", { className: "h-4 w-4 bg-gray-200 rounded" }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-56" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-40" })
    ] })
  ] }, idx)) });
}
function ReviewList({ reviews, isLoading }) {
  return /* @__PURE__ */ jsx("section", { className: "w-full space-y-10 max-h-[420px] overflow-y-auto pr-2", children: isLoading ? /* @__PURE__ */ jsx(ReviewSkeleton, {}) : reviews && reviews.length > 0 ? reviews.map((review, idx) => /* @__PURE__ */ jsx(ReviewCard, { review }, idx)) : /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Belum ada review." }) });
}
const showToast$1 = (message, type = "success") => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5e3,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: void 0,
    theme: "light",
    transition: Bounce,
    limit: 3
  };
  if (type === "success") {
    toast.success(`${message}`, toastOptions);
  } else if (type === "info") {
    toast.info(`${message}`, toastOptions);
  } else if (type === "error") {
    toast.error(`${message}`, toastOptions);
  } else if (type === "warning") {
    toast.warning(`${message}`, toastOptions);
  } else {
    toast(message, toastOptions);
  }
};
const ReviewModal = ({ isOpen: isOpen2, onClose, productId }) => {
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    product_id: productId,
    rating: 5,
    comment: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/review", {
      onSuccess: () => {
        reset();
        onClose();
        showToast$1(t2("global.reviewSuccessMessage"), "success");
      },
      onError: (errors2) => {
        const lang = i18n.language;
        const errorMessage = getInertiaErrorMessage(errors2.message, lang);
        Swal$1.fire({
          icon: "error",
          title: t2("global.swalError"),
          text: errorMessage
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Transition, { show: isOpen2, leave: "duration-200", children: /* @__PURE__ */ jsxs(
      Dialog,
      {
        as: "div",
        id: "modal",
        className: "fixed inset-0 z-50 flex items-center justify-center px-4 py-6",
        onClose,
        children: [
          /* @__PURE__ */ jsx(
            TransitionChild,
            {
              enter: "ease-out duration-300",
              enterFrom: "opacity-0",
              enterTo: "opacity-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100",
              leaveTo: "opacity-0",
              children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/80" })
            }
          ),
          /* @__PURE__ */ jsx(
            TransitionChild,
            {
              enter: "ease-out duration-300",
              enterFrom: "opacity-0 scale-95",
              enterTo: "opacity-100 scale-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100 scale-100",
              leaveTo: "opacity-0 scale-95",
              children: /* @__PURE__ */ jsx(DialogPanel, { className: "w-full max-w-sm transform overflow-hidden rounded-xl  text-white p-6 text-center transition-all", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: t2("global.reviewTitle", "How was your experience?") }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("rating", star),
                    className: "text-yellow-400 text-2xl focus:outline-none",
                    children: /* @__PURE__ */ jsx("i", { className: data.rating >= star ? "fas fa-star" : "far fa-star" })
                  },
                  star
                )) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.rating, className: "text-red-400 text-sm mt-1" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      name: "comment",
                      maxLength: 200,
                      value: data.comment,
                      onChange: handleChange,
                      placeholder: t2("global.reviewPlaceholder", "Write your review here..."),
                      className: "w-full bg-white rounded-xl p-3 text-sm text-black resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500",
                      rows: 3
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-3 text-xs text-gray-300", children: [
                    data.comment.length,
                    "/200"
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.review, className: "text-red-400 text-sm mt-1 text-left" })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "submit",
                    className: "w-full px-4 py-2 border bg-[#D9B36A] hover:bg-[#c2a061] align-center justify-center border-none gap-2 rounded-lg text-slate-700 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-black hover:shadow transition duration-150 flex items-center",
                    disabled: processing,
                    children: [
                      processing && /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsx(Spinner, { className: "h-4 w-4 animate-spin" }) }),
                      processing ? t2("global.processing") : t2("global.save")
                    ]
                  }
                )
              ] }) })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
};
function ReviewSummarySkeleton() {
  return /* @__PURE__ */ jsxs("section", { className: "md:w-1/3 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-1/2 mb-3" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-24 bg-gray-300 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 w-32 bg-gray-200 rounded" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full" }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-1/3" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-full" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-full" })
    ] })
  ] });
}
function ReviewSummary({ isLoading, summary, userReview }) {
  const { t: t2 } = useTranslation();
  const auth = usePage().props.auth.user;
  const productId = usePage().props.product.id;
  const [showAuthModal, setShowAuthModal] = useState$1(false);
  const [authMode, setAuthMode] = useState$1("login");
  const [showModal, setShowModal] = useState$1(false);
  const total = (summary == null ? void 0 : summary.total) || 0;
  const average = (summary == null ? void 0 : summary.average) || 0;
  const breakdown = (summary == null ? void 0 : summary.breakdown) && summary.breakdown.length === 5 ? summary.breakdown : [5, 4, 3, 2, 1].map((star) => ({ star, percent: 0 }));
  const handleWriteReview = () => {
    if (!auth || !auth.id) {
      setAuthMode("login");
      setShowAuthModal(true);
    } else {
      setShowModal(true);
    }
  };
  return isLoading ? /* @__PURE__ */ jsx(ReviewSummarySkeleton, {}) : /* @__PURE__ */ jsxs("section", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-lg mb-2", children: t2("home.reviewSummary") }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1 mb-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-base", children: /* @__PURE__ */ jsx("div", { className: "flex text-base gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
        "i",
        {
          className: summary && total > 0 && i < Math.round(average) ? "fas fa-star text-yellow-400" : "far fa-star text-gray-300"
        },
        i
      )) }) }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-700", children: [
        t2("home.basedOn"),
        " ",
        total,
        " ",
        t2("home.reviews")
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-6 mt-3", children: breakdown.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm font-semibold", children: [
      /* @__PURE__ */ jsx("span", { className: "w-5", children: item.star }),
      /* @__PURE__ */ jsx(
        "i",
        {
          className: `fas fa-star w-4 ${summary && total > 0 ? "text-yellow-400" : "text-gray-300"}`
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-3 rounded-full bg-gray-200 mx-3 flex-1", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-3 rounded-full bg-yellow-400",
          style: { width: `${item.percent}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: "w-8 text-right", children: [
        item.percent,
        "%"
      ] })
    ] }, item.star)) }),
    userReview ? /* @__PURE__ */ jsx(ReviewCard, { review: userReview }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1 text-sm", children: t2("home.shareYourThought") }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mb-3", children: t2("home.shareExperience") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full border border-gray-300 rounded-md py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50",
          type: "button",
          onClick: handleWriteReview,
          children: t2("home.writeReview")
        }
      ),
      /* @__PURE__ */ jsx(
        AuthModal,
        {
          isOpen: showAuthModal,
          onClose: () => setShowAuthModal(false),
          defaultMode: authMode
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      ReviewModal,
      {
        isOpen: showModal,
        onClose: () => setShowModal(false),
        productId
      }
    )
  ] });
}
function Review({ productId, initialReviews, summary, userReview }) {
  const { t: t2, i18n } = useTranslation();
  const [reviews, setReviews] = useState$1(initialReviews.data);
  const [page, setPage] = useState$1(2);
  const [hasMore, setHasMore] = useState$1(initialReviews.current_page < initialReviews.last_page);
  const isLoading = false;
  const fetchMoreReviews = async () => {
    router.get(
      `/product/${productId}`,
      { page },
      {
        preserveScroll: true,
        preserveState: true,
        only: ["reviews"],
        onSuccess: (pageProps) => {
          const newReviews = pageProps.props.reviews.data;
          setReviews((prev) => [...prev, ...newReviews]);
          setPage((prev) => prev + 1);
          setHasMore(pageProps.props.reviews.current_page < pageProps.props.reviews.last_page);
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 grid-cols-1 gap-20 mt-10", children: [
    /* @__PURE__ */ jsx(
      ReviewSummary,
      {
        isLoading,
        summary,
        userReview
      }
    ),
    !summary || Object.keys(summary).length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex justify-center text-center items-center w-full", children: t2("home.noReviews") }) : /* @__PURE__ */ jsx(
      InfiniteScroll,
      {
        dataLength: reviews.length,
        next: fetchMoreReviews,
        hasMore,
        loader: /* @__PURE__ */ jsx("p", { className: "text-center", children: "Loading..." }),
        scrollableTarget: null,
        children: /* @__PURE__ */ jsx(ReviewList, { reviews, isLoading })
      }
    )
  ] }) });
}
function ButtonFavorite({ product, isFavorited: initialFavorited = false }) {
  const { t: t2 } = useTranslation();
  const auth = usePage().props.auth;
  const [isFavorited, setIsFavorited] = useState$1(initialFavorited);
  const [pending, setPending] = useState$1(false);
  const REQUIRED_CATEGORIES = ["Makanan", "Minuman", "Kudapan"];
  const [showAuthModal, setShowAuthModalState] = useState$1(false);
  const [authMode, setAuthModeState] = useState$1("login");
  const timeoutRef = useRef(null);
  const handleFavorite = () => {
    if (!auth || !auth.user) {
      setAuthModeState("login");
      setShowAuthModalState(true);
      return;
    }
    const nextFavorited = !isFavorited;
    setIsFavorited(nextFavorited);
    if (nextFavorited) {
      toast.success(t2("global.addedToFavorites"));
      updatePreferences(product);
    } else {
      toast.info(t2("global.removedFromFavorites"));
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPending(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        axios$1.post(`/api/favorite`, { food_id: product.id });
      } catch (e) {
        setIsFavorited((prev) => !prev);
        toast.error(t2("global.errorAddFavorite"));
      } finally {
        setPending(false);
      }
    }, 800);
  };
  const updatePreferences = (food) => {
    if (!food) return;
    if (!localStorage.getItem("preferences") && auth && auth.user) {
      axios$1.get("/api/user-preferences").then((res) => {
        localStorage.setItem("preferences", JSON.stringify(res.data));
      });
    }
    const storedPreferences = JSON.parse(localStorage.getItem("preferences")) || {
      categories: [],
      ingredients: []
    };
    let categories = storedPreferences.categories.filter(
      (cat) => !food.categories.map((c) => c.name_id).includes(cat)
    );
    categories = [...categories, ...food.categories.map((cat) => cat.name_id)];
    const hasRequired = categories.some((cat) => REQUIRED_CATEGORIES.includes(cat));
    if (!hasRequired) {
      const fallback = REQUIRED_CATEGORIES.find((cat) => !categories.includes(cat));
      if (fallback) {
        categories.push(fallback);
      }
    }
    const newCategories = categories.slice(-5);
    let ingredients = storedPreferences.ingredients.filter(
      (ing) => !food.ingredients.map((i) => i.name_id).includes(ing)
    );
    ingredients = [...ingredients, ...food.ingredients.map((ing) => ing.name_id)];
    const newIngredients = ingredients.slice(-6);
    const preferences = {
      categories: newCategories,
      ingredients: newIngredients
    };
    localStorage.setItem("preferences", JSON.stringify(preferences));
    if (auth && auth.user) {
      axios$1.post(
        "/api/update-preference",
        { preferences },
        {
          preserveScroll: true,
          onSuccess: () => {
            console.log("Preferences synced to server.");
            showToast("Preferences updated", "success");
          },
          onError: () => {
            console.error("Failed to update preferences.");
            showToast("Failed to update preferences", "error");
          }
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-label": "Add to favorites",
        className: `flex-1 ml-4 ${isFavorited ? "bg-[#E63946] text-white" : "bg-white text-gray-800 border-2 hover:bg-slate-100"} font-semibold rounded-xl py-3 md:text-lg text-md flex items-center justify-center space-x-3 transition`,
        onClick: handleFavorite,
        disabled: pending,
        children: [
          isFavorited ? /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(HeartIcon, { className: "w-6 h-6" }),
          /* @__PURE__ */ jsx("span", { children: isFavorited ? t2("global.addedToFavorites") : t2("global.addToFavorite") })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      AuthModal,
      {
        isOpen: showAuthModal,
        onClose: () => setShowAuthModalState(false),
        defaultMode: authMode
      }
    )
  ] });
}
const Rating = ({ rating, userReviewCount, detailView = false }) => {
  const { t: t2 } = useTranslation();
  const safeRating = Math.max(0, Math.min(rating, 5));
  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return /* @__PURE__ */ jsxs("div", { className: "flex md:flex-row flex-col md:items-center text-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center md:justify-center justify-start text-sm md:text-base", children: [
      [...Array(fullStars)].map((_, i) => /* @__PURE__ */ jsx("i", { className: "fas fa-star text-yellow-400" }, `full-${i}`)),
      halfStar && /* @__PURE__ */ jsx("i", { className: "fas fa-star-half-alt text-yellow-400" }),
      [...Array(emptyStars)].map((_, i) => /* @__PURE__ */ jsx("i", { className: "far fa-star text-gray-300" }, `empty-${i}`))
    ] }),
    detailView ? /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
      safeRating,
      " ",
      t2("global.outOf"),
      " 5 (",
      userReviewCount,
      " ",
      t2("global.reviews"),
      ")"
    ] }) : /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-semibold mt-1", children: [
      safeRating,
      " (",
      userReviewCount,
      ")"
    ] })
  ] });
};
function ProductIngredients({ ingredients }) {
  const { t: t2, i18n } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "tab-content", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-gray-900 font-semibold text-lg mb-4", children: t2("home.ingredients") }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "mini-carousel",
        className: "flex gap-4 py-2 overflow-x-auto scrollbar-hide cursor-grab select-none",
        children: ingredients && ingredients.length > 0 ? ingredients.map((item, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex-shrink-0 w-32 flex flex-col items-center bg-white rounded-xl shadow p-2",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: getImageUrl(item.image),
                  alt: i18n.language === "en" ? item.name_en : item.name_id,
                  className: "w-14 h-14 object-contain mb-2"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-700 text-center", children: i18n.language === "en" ? item.name_en : item.name_id })
            ]
          },
          idx
        )) : /* @__PURE__ */ jsx(Fragment, { children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex-shrink-0 w-32 flex flex-col items-center bg-gray-100 rounded-xl p-2 animate-pulse",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-lg bg-gray-300 mb-2" }),
              /* @__PURE__ */ jsx("div", { className: "h-3 w-16 bg-gray-300 rounded" })
            ]
          },
          i
        )) })
      }
    )
  ] });
}
function LimitedText({ text, limit }) {
  const { t: t2 } = useTranslation();
  const [isExpanded, setIsExpanded] = useState$1(false);
  if (!text) return "-";
  const words = text.split(" ");
  const visibleText = isExpanded ? text : words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  const toggleText = isExpanded ? t2("global.showLess") : t2("global.showMore");
  return /* @__PURE__ */ jsxs("span", { children: [
    parse(visibleText),
    words.length > limit && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "text-blue-500 underline text-xs ml-1",
        onClick: () => setIsExpanded(!isExpanded),
        children: toggleText
      }
    )
  ] });
}
function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState$1("detail");
  const reviews = usePage().props.reviews;
  const summary = usePage().props.summary;
  const userReview = usePage().props.userReview;
  const isFavorited = usePage().props.isFavorited;
  const { t: t2, i18n } = useTranslation();
  const description = i18n.language === "en" ? product.description_en : product.description_id;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-white max-w-7xl pb-20 mx-auto rounded-t-3xl shadow-lg px-7 pt-8",
      style: { marginTop: "-30px" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-200 mb-6 relative bg-white", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `py-2 px-4 text-sm font-semibold text-gray-700 border-b-2 border-transparent cursor-pointer focus:outline-none transition-colors duration-200 ${activeTab === "detail" ? "active-tab border-b-green-600 text-green-700" : ""}`,
              type: "button",
              onClick: () => setActiveTab("detail"),
              children: "Detail"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `py-2 px-4 text-sm font-semibold text-gray-700 border-b-2 border-transparent cursor-pointer focus:outline-none transition-colors duration-200 ${activeTab === "bahan" ? "active-tab border-b-green-600 text-green-700" : ""}`,
              type: "button",
              onClick: () => setActiveTab("bahan"),
              children: t2("home.ingredients")
            }
          )
        ] }),
        activeTab === "detail" && /* @__PURE__ */ jsxs("div", { className: "tab-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: product.name }),
            /* @__PURE__ */ jsx(Rating, { rating: product.average_rating, userReviewCount: product.rating_count }),
            /* @__PURE__ */ jsx("p", { className: "text-green-600 font-semibold text-sm", children: product.portion_info })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mt-7", children: /* @__PURE__ */ jsxs("p", { className: "text-2xl font-semibold text-gray-900", children: [
            "Rp. ",
            Number(product.price).toLocaleString("id-ID")
          ] }) }),
          /* @__PURE__ */ jsx(LimitedText, { text: description, limit: 50 }),
          /* @__PURE__ */ jsx(Review, { productId: product.id, initialReviews: reviews, summary, userReview }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mt-7", children: /* @__PURE__ */ jsx(
            ButtonFavorite,
            {
              product,
              isFavorited
            }
          ) })
        ] }),
        activeTab === "bahan" && /* @__PURE__ */ jsx(ProductIngredients, { ingredients: product.ingredients })
      ]
    }
  );
}
function Detail() {
  const product = usePage().props.product;
  return /* @__PURE__ */ jsxs(HomeLayout, { children: [
    /* @__PURE__ */ jsx(
      FoodDetailBanner,
      {
        image1: product.image,
        image2: product.image_2,
        image3: product.image_3,
        alt: product.name
      }
    ),
    /* @__PURE__ */ jsx(
      ProductTabs,
      {
        product
      }
    )
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Detail
}, Symbol.toStringTag, { value: "Module" }));
function CardProduct({
  product,
  showFavorite = false,
  isFavorited = false,
  onRemove,
  favoriteDisplayOnly = false
}) {
  const { t: t2 } = useTranslation();
  const { auth } = usePage().props;
  const [pending, setPending] = useState$1(false);
  const [internalIsFavorited, setInternalIsFavorited] = useState$1(isFavorited);
  const timeoutRef = useRef(null);
  useEffect$1(() => {
    setInternalIsFavorited(isFavorited);
  }, [isFavorited]);
  const handleFavorite = () => {
    var _a, _b;
    if (!auth || !auth.user) {
      (_a = window.setAuthModeState) == null ? void 0 : _a.call(window, "login");
      (_b = window.setShowAuthModalState) == null ? void 0 : _b.call(window, true);
      return;
    }
    const nextFavorited = !isFavorited;
    setInternalIsFavorited(nextFavorited);
    if (!nextFavorited && typeof onRemove === "function") {
      onRemove(product.id);
    }
    if (nextFavorited) {
      toast.success(t2("global.addedToFavorites"));
    } else {
      toast.info(t2("global.removedFromFavorites"));
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPending(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        axios$1.post(`/api/favorite`, { food_id: product.id });
      } catch (e) {
        setInternalIsFavorited((prev) => !prev);
        toast.error(t2("global.errorAddFavorite"));
      } finally {
        setPending(false);
      }
    }, 800);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("product.detail", { id: product.id }),
        className: "bg-white h-full rounded-xl shadow cursor-pointer transition-transform duration-200 transform hover:scale-105 relative flex flex-col",
        style: { overflow: "visible" },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              alt: product.name,
              className: "w-full md:h-40 h-28 rounded-t-xl object-cover object-center",
              height: "180",
              src: getImageUrl(product.image),
              width: "320"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-xs md:text-md leading-tight", children: product.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-xs mb-2", children: [
              "Rp. ",
              Number(product.price).toLocaleString("id-ID")
            ] }),
            /* @__PURE__ */ jsx(Rating, { rating: product.rating, userReviewCount: product.rating_count })
          ] })
        ]
      }
    ),
    showFavorite && (favoriteDisplayOnly ? /* @__PURE__ */ jsx(Fragment, { children: isFavorited && /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute top-2 right-2 bg-white p-1 rounded-full shadow-md",
        title: isFavorited ? t2("global.addedToFavorites") : t2("global.addToFavorites"),
        children: /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-4 h-4 text-red-500 fill-red-500" })
      }
    ) }) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleFavorite,
        disabled: pending,
        className: "absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition",
        title: internalIsFavorited ? t2("global.removeFromFavorites") : t2("global.addToFavorites"),
        children: internalIsFavorited ? /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-4 h-4 text-red-500 fill-red-500" }) : /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4 text-gray-400" })
      }
    ))
  ] });
}
function Favorites({ favorites }) {
  const { auth } = usePage().props;
  const { t: t2 } = useTranslation();
  const [favoriteList, setFavoriteList] = useState$1(favorites);
  const handleRemoveFavorite = (favoriteId) => {
    setFavoriteList((prev) => prev.filter((fav) => fav.id !== favoriteId));
  };
  return /* @__PURE__ */ jsx(HomeLayout, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-6", children: t2("favorites.myFavorites") }),
    !(auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsx(NotLoggedIn$1, { t: t2 }) : favoriteList.length === 0 ? /* @__PURE__ */ jsx(NoFavourites, { t: t2 }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: favoriteList.map((fav) => /* @__PURE__ */ jsx(
      CardProduct,
      {
        product: fav.food,
        showFavorite: true,
        isFavorited: true,
        onRemove: () => handleRemoveFavorite(fav.id)
      },
      fav.id
    )) })
  ] }) });
}
const NotLoggedIn$1 = ({ t: t2 }) => {
  const [showAuthModal, setShowAuthModal] = useState$1(false);
  const [authMode, setAuthMode] = useState$1("login");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center py-12 px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-blue-100", children: /* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-12 h-12 text-blue-500" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: t2("favorites.notLogin") }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: t2("favorites.notLoginDescription") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setAuthMode("login");
            setShowAuthModal(true);
          },
          className: "bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition",
          children: t2("global.login")
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AuthModal,
      {
        isOpen: showAuthModal,
        onClose: () => setShowAuthModal(false),
        defaultMode: authMode
      }
    )
  ] });
};
const NoFavourites = ({ t: t2 }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center py-12 px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-pink-100", children: /* @__PURE__ */ jsx(HeartIcon, { className: "w-12 h-12 text-pink-500" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: t2("favorites.noFavoritesFound") }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: t2("favorites.noFavoritesFoundDescription") }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: "/home",
        className: "bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition",
        children: t2("global.goBack")
      }
    )
  ] });
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Favorites
}, Symbol.toStringTag, { value: "Module" }));
function CardProductSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-white h-full rounded-xl shadow animate-pulse flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-40 bg-gray-200 rounded-t-xl" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col flex-1 space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-3/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-1/2" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex space-x-1", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-4" })
      ] })
    ] })
  ] });
}
function PartnerSection() {
  const [partners, setPartners] = useState$1([]);
  const [loading, setLoading] = useState$1(true);
  useEffect$1(() => {
    fetch("/api/partners").then((res) => res.json()).then((data) => {
      let fetchedPartners = data.partners;
      if (fetchedPartners.length > 0 && fetchedPartners.length < 4) {
        const repeatCount = Math.ceil(9 / fetchedPartners.length);
        fetchedPartners = Array(repeatCount).fill(fetchedPartners).flat().slice(0, 9);
      }
      setPartners(fetchedPartners);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ jsx(Fragment, { children: partners.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-gray-50 py-8", children: /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, speed: 50, gradient: true, children: partners.map((partner, index) => /* @__PURE__ */ jsx(
    "img",
    {
      src: getImageUrl(partner.image),
      alt: partner.name,
      className: "lg:h-10 h-5 mx-6"
    },
    index
  )) }) }) });
}
function HomePage() {
  var _a;
  const { t: t2 } = useTranslation();
  const auth = usePage().props.auth;
  const isPreferenceStored = ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.isPreferenceStored) ?? null;
  const [recommendedProducts, setRecommendedProducts] = useState$1([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState$1(true);
  const [categories, setCategories] = useState$1([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState$1(true);
  const [ourSelectionProducts, setOurSelectionProducts] = useState$1([]);
  const [isLoadingOurSelection, setIsLoadingOurSelection] = useState$1(true);
  const syncPreferencesToServer = async (auth2, isPreferenceStored2) => {
    const prefs = localStorage.getItem("preferences");
    if (!(auth2 == null ? void 0 : auth2.user) || isPreferenceStored2 || !prefs) return;
    const parsedPrefs = JSON.parse(prefs);
    try {
      await axios.post("/api/user/preference", {
        categories: parsedPrefs.categories,
        ingredients: parsedPrefs.ingredients,
        budget: parsedPrefs.budget
      });
      console.log("Preferences synced to server.");
    } catch (err) {
      console.error("Failed to sync preferences:", err);
    }
  };
  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data || []);
    } catch {
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };
  const fetchOurSelection = async () => {
    try {
      setIsLoadingOurSelection(true);
      const res = await axios.get("/api/our-selection");
      setOurSelectionProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching our selection:", err);
      setOurSelectionProducts([]);
    } finally {
      setIsLoadingOurSelection(false);
    }
  };
  const fetchRecommendations = async (auth2) => {
    var _a2, _b;
    try {
      setIsLoadingRecommendations(true);
      const prefs = JSON.parse(localStorage.getItem("preferences")) || {};
      if (!(auth2 == null ? void 0 : auth2.user) && (!((_a2 = prefs.categories) == null ? void 0 : _a2.length) && !((_b = prefs.ingredients) == null ? void 0 : _b.length))) {
        return;
      }
      const params = (auth2 == null ? void 0 : auth2.user) ? {} : {
        categories: prefs.categories,
        ingredients: prefs.ingredients,
        budget: prefs.budget
      };
      const res = await axios.get("/get-recommendations", { params });
      setRecommendedProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };
  const redirectIfNoPreferences = (auth2) => {
    const prefs = localStorage.getItem("preferences");
    if (!(auth2 == null ? void 0 : auth2.user) && !prefs) {
      router.visit("/");
    }
  };
  useEffect$1(() => {
    const init = async () => {
      redirectIfNoPreferences(auth);
      await fetchRecommendations(auth);
      await syncPreferencesToServer(auth, isPreferenceStored);
      await fetchCategories();
      await fetchOurSelection();
    };
    init();
  }, [auth == null ? void 0 : auth.user, isPreferenceStored]);
  return /* @__PURE__ */ jsx(HomeLayout, { className: "px-4 sm:px-6 md:px-10 lg:px-16 pb-10", children: /* @__PURE__ */ jsx(PartnerSection, {}) });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
function SelectBox({ label, options = [], value, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        className: "w-full border border-gray-300 rounded px-3 py-2 text-sm",
        value,
        onChange,
        children: options.map((opt, idx) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, idx))
      }
    )
  ] });
}
function CheckboxList({ title, options, selected, onChange, disabled }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-2", children: title }),
    options.map((item, idx) => {
      const inputId = `checkbox-${title}-${idx}`;
      return /* @__PURE__ */ jsxs("div", { className: "ml-0.5 mb-1", children: [
        /* @__PURE__ */ jsxs("label", { className: "cursor-pointer relative", htmlFor: inputId, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: inputId,
              className: "peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800",
              checked: selected.includes(item),
              onChange: () => onChange(item),
              disabled
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-3.5 w-3.5",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              stroke: "currentColor",
              strokeWidth: "1",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  clipRule: "evenodd"
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "cursor-pointer ml-3 text-slate-600 text-sm", children: item })
      ] }, idx);
    })
  ] });
}
function PriceRangeSlider({ min = 0, max = 1e4, value, onChange, disabled }) {
  const [range, setRange] = useState$1(value || [min, max]);
  const { t: t2 } = useTranslation();
  const handleSliderChange = (newRange) => {
    setRange(newRange);
    onChange && onChange(newRange);
  };
  const handleInputChange = (index, val) => {
    const newRange = [...range];
    newRange[index] = Number(val);
    setRange(newRange);
    onChange && onChange(newRange);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-2", children: t2("global.priceRange") }),
    /* @__PURE__ */ jsxs("div", { className: "px-2", children: [
      /* @__PURE__ */ jsx(
        Slider,
        {
          range: true,
          min,
          max,
          value: range,
          onChange: handleSliderChange,
          trackStyle: [{ backgroundColor: "#86efac" }],
          handleStyle: [
            { borderColor: "#86efac", backgroundColor: "#86efac" },
            { borderColor: "#86efac", backgroundColor: "#86efac" }
          ],
          railStyle: { backgroundColor: "#e5e7eb" },
          dotStyle: { backgroundColor: "#86efac" },
          activeDotStyle: { backgroundColor: "#16a34a" },
          disabled
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: range[0],
            onChange: (e) => handleInputChange(0, e.target.value),
            className: "border px-2 py-1 w-20 rounded text-center",
            disabled
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: range[1],
            onChange: (e) => handleInputChange(1, e.target.value),
            className: "border px-2 py-1 w-20 rounded text-center",
            disabled
          }
        )
      ] })
    ] })
  ] });
}
function RatingSelector({ selectedRating, onChange, disabled }) {
  const options = [4, 3, 2];
  const { t: t2 } = useTranslation();
  const handleChange = (rating) => {
    if (selectedRating === rating) {
      onChange(null);
    } else {
      onChange(rating);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-2", children: "Rating" }),
    options.map((rating) => /* @__PURE__ */ jsxs("label", { className: "flex items-center mb-1 cursor-pointer", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          className: "mr-2",
          checked: selectedRating === rating,
          onChange: () => handleChange(rating),
          disabled
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        [1, 2, 3, 4, 5].map(
          (i) => i <= rating ? /* @__PURE__ */ jsx("i", { className: "fas fa-star text-yellow-400" }, `full-${i}`) : /* @__PURE__ */ jsx("i", { className: "far fa-star text-gray-300" }, `empty-${i}`)
        ),
        /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-gray-600", children: [
          rating,
          ".0 & ",
          t2("global.up")
        ] })
      ] })
    ] }, rating))
  ] });
}
function ProductFilter({ categories, selectedCategory, filters, setFilters, onApply, isLoading }) {
  const debounceRef = useRef(null);
  const { t: t2 } = useTranslation();
  useEffect$1(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onApply && onApply(filters, false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [filters]);
  useEffect$1(() => {
    if (selectedCategory && !filters.selectedItems.includes(selectedCategory)) {
      setFilters((prev) => ({
        ...prev,
        selectedItems: [selectedCategory]
      }));
    }
  }, [selectedCategory]);
  const handleSearchInput = (e) => {
    if (isLoading) return;
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };
  const toggleItem = (item) => {
    if (isLoading) return;
    setFilters((prev) => {
      const selectedItems = prev.selectedItems.includes(item) ? prev.selectedItems.filter((i) => i !== item) : [...prev.selectedItems, item];
      return { ...prev, selectedItems };
    });
  };
  const handleReset = () => {
    if (isLoading) return;
    setFilters({
      search: "",
      sort: "featured",
      selectedItems: [],
      price: [0, 25e3],
      rating: null
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 w-full rounded-lg lg:shadow-md md:shadow-none", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: t2("navbar.searchPlaceholder"),
        value: filters.search,
        onChange: handleSearchInput,
        className: "w-full mb-4 px-3 py-2 border border-gray-300 rounded text-sm",
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ jsx(
      SelectBox,
      {
        label: t2("global.sortBy"),
        value: filters.sort,
        onChange: (e) => !isLoading && setFilters((prev) => ({ ...prev, sort: e.target.value })),
        options: [
          { label: t2("global.lowToHigh"), value: "low" },
          { label: t2("global.highToLow"), value: "high" }
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      CheckboxList,
      {
        title: t2("global.showing"),
        options: ["All Category", ...categories.map((p) => p.name_id)],
        selected: filters.selectedItems,
        onChange: toggleItem,
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ jsx(
      RatingSelector,
      {
        selectedRating: filters.rating,
        onChange: (value) => !isLoading && setFilters((prev) => ({ ...prev, rating: value })),
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ jsx(
      PriceRangeSlider,
      {
        min: 0,
        max: 35e3,
        value: filters.price,
        onChange: (value) => !isLoading && setFilters((prev) => ({ ...prev, price: value })),
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between mt-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "px-4 py-2 text-sm border border-gray-300 rounded",
        onClick: handleReset,
        disabled: isLoading,
        children: "Reset"
      }
    ) })
  ] });
}
function SearchResult({ categories = [], search = "", selectedCategory = null }) {
  const [products, setProducts] = useState$1([]);
  const [page, setPage] = useState$1(1);
  const [hasMore, setHasMore] = useState$1(true);
  const [isLoading, setIsLoading] = useState$1(false);
  const [lastFetchedCount, setLastFetchedCount] = useState$1(0);
  const { t: t2 } = useTranslation();
  const [filters, setFilters] = useState$1({
    search,
    sort: "featured",
    selectedItems: [],
    selectedCategory,
    price: [0, 25e3],
    rating: null
  });
  const [showFilter, setShowFilter] = useState$1(false);
  const handleApplyFilter = async (newFilters = filters, isLoadMore = false) => {
    if (isLoading) return;
    setIsLoading(true);
    const nextPage = isLoadMore ? page + 1 : 1;
    try {
      const res = await axios.get("/api/filter-product", {
        params: {
          search: newFilters.search,
          sort: newFilters.sort,
          rating: newFilters.rating,
          price_min: newFilters.price[0],
          price_max: newFilters.price[1],
          categories: newFilters.selectedItems,
          page: nextPage
        }
      });
      const newProducts = res.data.products;
      setLastFetchedCount(newProducts.data.length);
      if (isLoadMore) {
        setProducts((prev) => [...prev, ...newProducts.data]);
      } else {
        setProducts(newProducts.data);
      }
      setFilters(newFilters);
      setPage(newProducts.current_page);
      setHasMore(newProducts.current_page < newProducts.last_page);
    } catch (err) {
      console.error("Error fetching products", err);
    }
    setIsLoading(false);
  };
  return /* @__PURE__ */ jsx(HomeLayout, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:hidden mb-2 sticky top-[7.3rem] z-[40] flex justify-end", children: /* @__PURE__ */ jsx(
      Button$1,
      {
        className: "px-4 py-2 rounded-lg font-semibold normal-case bg-[#D9B36A]",
        onClick: () => setShowFilter(true),
        children: "Filter"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxs(
        Drawer,
        {
          open: showFilter,
          onClose: () => setShowFilter(false),
          placement: "right",
          size: 320,
          className: "p-0 h-screen max-h-screen flex flex-col z-[9999]",
          overlayProps: { className: "z-[9998] bg-black/25" },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex justify-between items-center px-4 py-3 border-b", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Filter" }),
              /* @__PURE__ */ jsx(
                IconButton,
                {
                  variant: "text",
                  color: "blue-gray",
                  onClick: () => setShowFilter(false),
                  children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-4 py-2", children: /* @__PURE__ */ jsx(
              ProductFilter,
              {
                categories,
                filters,
                selectedCategory,
                setFilters,
                onApply: (f) => {
                  handleApplyFilter(f);
                  setShowFilter(false);
                },
                isLoading
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "sticky md:w-96 md:top-32 lg:top-24 h-fit hidden lg:block", children: /* @__PURE__ */ jsx(
        ProductFilter,
        {
          categories,
          filters,
          selectedCategory,
          setFilters,
          onApply: handleApplyFilter,
          isLoading
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs(
        InfiniteScroll,
        {
          dataLength: products.length,
          next: handleApplyFilter,
          hasMore,
          scrollThreshold: 0.75,
          className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 py-5 w-full",
          children: [
            products.map((product) => /* @__PURE__ */ jsx(CardProduct, { product }, product.id)),
            isLoading && products.length > 0 && Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsx(CardProductSkeleton, {}, `skeleton-next-${idx}`)),
            isLoading && products.length === 0 && Array.from({ length: 10 }).map((_, idx) => /* @__PURE__ */ jsx(CardProductSkeleton, {}, idx))
          ]
        }
      ) }),
      !isLoading && products.length === 0 && /* @__PURE__ */ jsx("div", { className: "w-full text-center text-gray-500 py-10", children: t2("product.notFound") })
    ] })
  ] }) });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchResult
}, Symbol.toStringTag, { value: "Module" }));
function PreferenceCard({ label, imageUrl, selected, onClick }) {
  const imagePath = imageUrl ? getImageUrl(imageUrl) : null;
  console.log("Image Path:", imagePath);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: `flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${selected ? "bg-yellow-300 text-black border-transparent" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"}`,
      children: [
        imageUrl && /* @__PURE__ */ jsx(
          "img",
          {
            src: getImageUrl(imageUrl),
            alt: label,
            className: "w-6 h-6 object-fill bg-white rounded-full"
          }
        ),
        label
      ]
    }
  );
}
function PreferencePage() {
  const {
    categories: categoriesRaw = [],
    mainCategories: mainCategoriesRaw = [],
    ingredients: ingredientsRaw = [],
    maxPrice = 5e5
  } = usePage().props;
  const { t: t2, i18n } = useTranslation();
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : Object.values(categoriesRaw);
  const mainCategories = Array.isArray(mainCategoriesRaw) ? mainCategoriesRaw : Object.values(mainCategoriesRaw);
  const ingredients = Array.isArray(ingredientsRaw) ? ingredientsRaw : Object.values(ingredientsRaw);
  const [selectedMainCategories, setSelectedMainCategories] = useState$1([]);
  const [selectedFlavorCategories, setSelectedFlavorCategories] = useState$1([]);
  const [selectedIngredients, setSelectedIngredients] = useState$1([]);
  const [budget, setBudget] = useState$1();
  const [hasPreferences, setHasPreferences] = useState$1(false);
  useEffect$1(() => {
    const prefs = localStorage.getItem("preferences");
    if (prefs) {
      setHasPreferences(true);
      setTimeout(() => {
        router.visit("/home");
      }, 1e3);
    }
  }, []);
  const toggleSelection = (item, list, setList, max = 5, type = "kategori") => {
    if (list.includes(item)) {
      setList((prev) => prev.filter((i) => i !== item));
    } else if (list.length >= max) {
      Swal$1.fire({
        icon: "warning",
        title: "Batas maksimum",
        text: `Maksimal memilih ${max} ${type}.`,
        timer: 2e3,
        showConfirmButton: false
      });
    } else {
      setList((prev) => [...prev, item]);
    }
  };
  const savePreferences = () => {
    if (!budget) {
      Swal$1.fire({
        icon: "warning",
        title: t2("preference.alerts.emptyBudgetTitle"),
        text: t2("preference.alerts.emptyBudgetText")
      });
      return;
    } else if (budget < 2e4 || budget > (maxPrice || 5e5)) {
      Swal$1.fire({
        icon: "warning",
        title: t2("preference.alerts.invalidBudgetTitle"),
        text: t2("preference.alerts.invalidBudgetText", {
          maxPrice: `Rp ${(maxPrice || 5e5).toLocaleString("id-ID")}`
        })
      });
      return;
    }
    if (selectedMainCategories.length < 1) {
      Swal$1.fire({
        icon: "warning",
        title: t2("preference.alerts.noMainCategoryTitle"),
        text: t2("preference.alerts.noMainCategoryText")
      });
      return;
    } else if (selectedMainCategories.length > 2) {
      Swal$1.fire({
        icon: "info",
        title: t2("preference.alerts.maxMainCategoryTitle"),
        text: t2("preference.alerts.maxMainCategoryText")
      });
      return;
    }
    if (selectedFlavorCategories.length < 2) {
      Swal$1.fire({
        icon: "warning",
        title: t2("preference.alerts.notEnoughCategoryTitle"),
        text: t2("preference.alerts.notEnoughCategoryText")
      });
      return;
    }
    if (selectedIngredients.length < 3) {
      Swal$1.fire({
        icon: "warning",
        title: t2("preference.alerts.notEnoughIngredientTitle"),
        text: t2("preference.alerts.notEnoughIngredientText")
      });
      return;
    }
    const allSelectedCategories = [...selectedMainCategories, ...selectedFlavorCategories];
    const preferences = {
      categories: allSelectedCategories,
      // Digabung menjadi satu
      ingredients: selectedIngredients,
      budget
    };
    localStorage.setItem("preferences", JSON.stringify(preferences));
    router.visit("/home");
  };
  if (hasPreferences) {
    return /* @__PURE__ */ jsxs("div", { className: "h-screen flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-green-100 rounded-full p-6 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-12 h-12 text-green-500" }) }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-lg font-medium mb-2", children: t2("preference.setSuccess") }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-500 mb-4", children: t2("preference.redirectingToHome") }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
        /* @__PURE__ */ jsx("span", { className: "animate-bounce", children: "." }),
        /* @__PURE__ */ jsx("span", { className: "animate-bounce delay-150", children: "." }),
        /* @__PURE__ */ jsx("span", { className: "animate-bounce delay-300", children: "." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: t2("preference.choose") }),
      /* @__PURE__ */ jsx(LanguageDropdown, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: t2("preference.mainCategory") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: mainCategories.map((cat) => {
        const name = i18n.language === "en" ? cat.name_en : cat.name_id;
        return /* @__PURE__ */ jsx(
          PreferenceCard,
          {
            label: name,
            imageUrl: cat.image,
            selected: selectedMainCategories.includes(cat.name_id),
            disabled: selectedMainCategories.length >= 2 && !selectedMainCategories.includes(cat.name_id),
            info: selectedMainCategories.length >= 2 && !selectedMainCategories.includes(cat.name_id) ? "Maksimal tercapai" : null,
            onClick: () => toggleSelection(cat.name_id, selectedMainCategories, setSelectedMainCategories, 2, "kategori utama")
          },
          cat.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: t2("home.flavor") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((cat) => {
        const name = i18n.language === "en" ? cat.name_en : cat.name_id;
        return /* @__PURE__ */ jsx(
          PreferenceCard,
          {
            label: name,
            imageUrl: cat.image,
            selected: selectedFlavorCategories.includes(cat.name_id),
            disabled: selectedFlavorCategories.length >= 4 && !selectedFlavorCategories.includes(cat.name_id),
            info: selectedFlavorCategories.length >= 4 && !selectedFlavorCategories.includes(cat.name_id) ? "Maksimal tercapai" : null,
            onClick: () => toggleSelection(cat.name_id, selectedFlavorCategories, setSelectedFlavorCategories, 4, "rasa")
          },
          cat.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: t2("preference.ingredients") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ingredients.map((ing) => {
        const name = i18n.language === "en" ? ing.name_en : ing.name_id;
        return /* @__PURE__ */ jsx(
          PreferenceCard,
          {
            label: name,
            imageUrl: ing.image,
            selected: selectedIngredients.includes(ing.name_id),
            disabled: selectedIngredients.length >= 6 && !selectedIngredients.includes(ing.name_id),
            info: selectedIngredients.length >= 6 && !selectedIngredients.includes(ing.name_id) ? "Maksimal tercapai" : null,
            onClick: () => toggleSelection(ing.name_id, selectedIngredients, setSelectedIngredients, 6, "bahan")
          },
          ing.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: t2("preference.yourBudget") }),
      /* @__PURE__ */ jsx("div", { className: " items-center gap-4 w-full", children: /* @__PURE__ */ jsx(
        TextInput,
        {
          type: "number",
          min: 2e4,
          max: maxPrice || 5e5,
          step: 1e3,
          value: budget,
          onChange: (e) => setBudget(e.target.value),
          className: "w-full flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
          placeholder: "Rp. 20000",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: t2("preference.maxPrice", { price: `Rp ${maxPrice || 1e5}` }) })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-[#D9B36A] text-[#0E1C2D] hover:bg-[#caa45f] rounded-md w-full px-4 py-1.5 text-lg font-semibold transition",
        onClick: savePreferences,
        children: t2("preference.save")
      }
    )
  ] });
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreferencePage
}, Symbol.toStringTag, { value: "Module" }));
function DeleteUserForm({ className = "" }) {
  const { t: t2 } = useTranslation();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState$1(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: t2("profile.deleteAccount") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: t2("profile.deleteAccountDescription") })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: t2("profile.deleteAccount") }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        show: confirmingUserDeletion,
        onClose: closeModal,
        footer: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: t2("global.cancel") }),
          /* @__PURE__ */ jsx(DangerButton, { disabled: processing, onClick: deleteUser, children: t2("profile.deleteAccount") })
        ] }),
        children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: t2("profile.deleteAccountConfirmation") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Masukan password untuk konfirmasi penghapusan akun" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx(
              InputLabel,
              {
                htmlFor: "password",
                value: "Password",
                className: "sr-only"
              }
            ),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                ref: passwordInput,
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                className: "mt-1 block w-3/4",
                isFocused: true,
                placeholder: "Password"
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password,
                className: "mt-2"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { t: t2 } = useTranslation();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast.success(t2("home.addedToFavorites"));
      },
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: t2("profile.updatePassword") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: t2("profile.updatePasswordDescription") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: t2("profile.currentPassword")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t2("profile.newPassword") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: t2("profile.confirmNewPassword")
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t2("global.save") }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: t2("global.saved") })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { t: t2, i18n } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    country: user.country || "",
    state: user.state || "",
    city: user.city || "",
    image: user.photo_profile || "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...data, _method: "put" };
    if (payload.image && typeof payload.image !== "object") {
      delete payload.image;
    }
    router.post(route("profile.update"), {
      ...payload,
      _method: "put"
    }, {
      onSuccess: () => {
        reset();
        showToast$1(t2("user.updatedMessage"), "success");
      },
      onError: (errors2) => {
        const errorMessage = getInertiaErrorMessage(errors2.message, i18n.language);
        Swal.fire("Error!", errorMessage, "error");
      }
    });
  };
  const countryOptions = useMemo(
    () => Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name
    })),
    []
  );
  const stateOptions = useMemo(
    () => data.country ? State.getStatesOfCountry(data.country).map((s) => ({
      value: s.isoCode,
      label: s.name
    })) : [],
    [data.country]
  );
  const cityOptions = useMemo(
    () => data.country && data.state ? City.getCitiesOfState(data.country, data.state).map((c) => ({
      value: c.name,
      label: c.name
    })) : [],
    [data.country, data.state]
  );
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: t2("profile.updateProfileInformation") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: t2("profile.updateProfileInformationDescription") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t2("global.name") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: handleChange,
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            name: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: handleChange,
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: t2("global.personalData") }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: t2("global.phone") }),
            /* @__PURE__ */ jsx(
              PhoneInput,
              {
                country: "id",
                value: data.phone,
                onChange: (phone) => setData("phone", phone),
                inputClass: "!rounded-md !border-gray-300 !shadow-sm focus:!border-indigo-500 focus:!ring-indigo-500 !w-full !pl-12 !pr-3 py-2",
                buttonClass: "!bg-white !border-r !border-gray-300 !rounded-l-md",
                containerClass: "!w-full"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "address", value: t2("global.address") }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "address",
                name: "address",
                value: data.address || "",
                onChange: handleChange,
                className: "mt-1 block w-full",
                autoComplete: "address",
                placeholder: "Address"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "country", value: t2("global.country") }),
            /* @__PURE__ */ jsx(
              Select$1,
              {
                options: countryOptions,
                id: "country",
                name: "country",
                value: countryOptions.find((option) => option.value === data.country) || null,
                onChange: (selectedOption) => {
                  setData("country", selectedOption ? selectedOption.value : "");
                  setData("state", "");
                  setData("city", "");
                },
                placeholder: "Country",
                isClearable: true,
                menuPlacement: "auto",
                menuShouldScrollIntoView: false
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.country, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "state", value: t2("global.state") }),
            /* @__PURE__ */ jsx(
              Select$1,
              {
                options: stateOptions,
                id: "state",
                name: "state",
                value: stateOptions.find((option) => option.value === data.state) || null,
                onChange: (selectedOption) => {
                  setData("state", selectedOption ? selectedOption.value : "");
                  setData("city", "");
                },
                placeholder: "State",
                isClearable: true,
                isDisabled: !data.country,
                menuPlacement: "auto",
                menuShouldScrollIntoView: false
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.state, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "city", value: t2("global.city") }),
            /* @__PURE__ */ jsx(
              Select$1,
              {
                options: cityOptions,
                id: "city",
                name: "city",
                value: cityOptions.find((option) => option.value === data.city) || null,
                onChange: (selectedOption) => {
                  setData("city", selectedOption ? selectedOption.value : "");
                },
                placeholder: "City",
                isClearable: true,
                isDisabled: !data.state,
                menuPlacement: "auto",
                menuShouldScrollIntoView: false
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.city, className: "mt-2" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "city", value: t2("global.photoProfile") }),
        /* @__PURE__ */ jsx(
          UploadInputWithPreview,
          {
            id: "image",
            name: "image",
            label: "Image",
            accept: ".jpg,.jpeg,.png",
            maxSizeMB: 0.5,
            onChange: (e) => setData("image", e.target.files[0]),
            value: data.image,
            error: errors.image
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t2("global.save") }) })
    ] }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function AccordionItem({ label, icon, open, onClick, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "border-b last:border-b-0", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex items-center w-full py-3 text-left focus:outline-none",
        onClick,
        children: [
          icon,
          /* @__PURE__ */ jsx("span", { className: "flex-1 font-medium", children: label }),
          open ? /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-5 h-5" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "px-3 pb-4", children })
  ] });
}
function ProfileAccordion() {
  const [open, setOpen] = useState$1(null);
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: t2("profile.updateInformation"),
        icon: /* @__PURE__ */ jsx(UserIcon, { className: "w-6 h-6 mr-2 text-gray-500" }),
        open: open === 0,
        onClick: () => setOpen(open === 0 ? null : 0),
        children: /* @__PURE__ */ jsx(UpdateProfileInformation, {})
      }
    ),
    /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: t2("profile.updatePassword"),
        icon: /* @__PURE__ */ jsx(KeyIcon, { className: "w-6 h-6 mr-2 text-gray-500" }),
        open: open === 1,
        onClick: () => setOpen(open === 1 ? null : 1),
        children: /* @__PURE__ */ jsx(UpdatePasswordForm, {})
      }
    ),
    /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: t2("profile.deleteAccount"),
        icon: /* @__PURE__ */ jsx(TrashIcon, { className: "w-6 h-6 mr-2 text-red-500" }),
        open: open === 2,
        onClick: () => setOpen(open === 2 ? null : 2),
        children: /* @__PURE__ */ jsx(DeleteUserForm, {})
      }
    )
  ] });
}
const NotLoggedIn = () => {
  const [showAuthModal, setShowAuthModal] = useState$1(false);
  const [authMode, setAuthMode] = useState$1("login");
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center py-12 px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-blue-100", children: /* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-12 h-12 text-blue-500" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: t2("profile.youreNotLogin") }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: t2("profile.pleaseLoginToAccessYourProfile") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setAuthMode("login");
            setShowAuthModal(true);
          },
          className: "bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition",
          children: t2("global.login")
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AuthModal,
      {
        isOpen: showAuthModal,
        onClose: () => setShowAuthModal(false),
        defaultMode: authMode
      }
    )
  ] }) });
};
function Edit() {
  var _a, _b, _c, _d;
  const { auth } = usePage().props;
  const { t: t2 } = useTranslation();
  if (!(auth == null ? void 0 : auth.user)) {
    return /* @__PURE__ */ jsx(NotLoggedIn, {});
  }
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Profil",
        subtitle: "Ubah Informasi pribadi anda"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-white h-[80vh]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 space-y-2 sm:px-6 lg:px-8 overflow-y-scroll h-full", children: [
      /* @__PURE__ */ jsxs("section", { className: "flex items-center space-x-4 mb-8", children: [
        /* @__PURE__ */ jsx(Avatar, { imagePath: auth.user.photo_profile, name: (_a = auth.user) == null ? void 0 : _a.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900", children: (_b = auth.user) == null ? void 0 : _b.name }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 select-text", children: (_c = auth.user) == null ? void 0 : _c.email }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 select-text", children: (_d = auth.user) == null ? void 0 : _d.phone })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ProfileAccordion, {})
    ] }) })
  ] });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard/Admin/Index.jsx": __vite_glob_0_0, "./Pages/Admin/Dashboard/Lecturer/Index.jsx": __vite_glob_0_1, "./Pages/Admin/Dashboard/Lecturer/partials/RequestTable.jsx": __vite_glob_0_2, "./Pages/Admin/Dashboard/Student/Index.jsx": __vite_glob_0_3, "./Pages/Admin/Dashboard/Student/partials/CreateModal.jsx": __vite_glob_0_4, "./Pages/Admin/Dashboard/Student/partials/StudentTable.jsx": __vite_glob_0_5, "./Pages/Admin/Guidance-Student/Index.jsx": __vite_glob_0_6, "./Pages/Admin/Guidance-Student/partials/GuidanceFilter.jsx": __vite_glob_0_7, "./Pages/Admin/Guidance-Student/partials/GuidanceTable.jsx": __vite_glob_0_8, "./Pages/Admin/Master-Data/Lecturer/Index.jsx": __vite_glob_0_9, "./Pages/Admin/Master-Data/Lecturer/partials/CreateModal.jsx": __vite_glob_0_10, "./Pages/Admin/Master-Data/Lecturer/partials/EditModal.jsx": __vite_glob_0_11, "./Pages/Admin/Master-Data/Lecturer/partials/LecturerTable.jsx": __vite_glob_0_12, "./Pages/Admin/Master-Data/Student/Index.jsx": __vite_glob_0_13, "./Pages/Admin/Master-Data/Student/partials/CreateModal.jsx": __vite_glob_0_14, "./Pages/Admin/Master-Data/Student/partials/EditModal.jsx": __vite_glob_0_15, "./Pages/Admin/Master-Data/Student/partials/StudentTable.jsx": __vite_glob_0_16, "./Pages/Admin/RBAC/Roles/Index.jsx": __vite_glob_0_17, "./Pages/Admin/RBAC/Roles/partials/CreateModal.jsx": __vite_glob_0_18, "./Pages/Admin/RBAC/Roles/partials/EditModal.jsx": __vite_glob_0_19, "./Pages/Admin/RBAC/Roles/partials/PermissionDetailModal.jsx": __vite_glob_0_20, "./Pages/Admin/RBAC/Roles/partials/RoleTable.jsx": __vite_glob_0_21, "./Pages/Admin/RBAC/User/Index.jsx": __vite_glob_0_22, "./Pages/Admin/RBAC/User/partials/CreateModal.jsx": __vite_glob_0_23, "./Pages/Admin/RBAC/User/partials/EditModal.jsx": __vite_glob_0_24, "./Pages/Admin/RBAC/User/partials/UserTable.jsx": __vite_glob_0_25, "./Pages/Admin/Setting/System-Setting/Index.jsx": __vite_glob_0_26, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_27, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_28, "./Pages/Auth/Login.jsx": __vite_glob_0_29, "./Pages/Auth/Register.jsx": __vite_glob_0_30, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_31, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_32, "./Pages/Dashboard.jsx": __vite_glob_0_33, "./Pages/Food/FoodList.jsx": __vite_glob_0_34, "./Pages/Home/Detail.jsx": __vite_glob_0_35, "./Pages/Home/Favorites.jsx": __vite_glob_0_36, "./Pages/Home/Index.jsx": __vite_glob_0_37, "./Pages/Home/SearchResult.jsx": __vite_glob_0_38, "./Pages/Preference/PreferencePage.jsx": __vite_glob_0_39, "./Pages/Profile/Edit.jsx": __vite_glob_0_40, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_41, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_42, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_43 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => React.createElement(App, props)
  })
);
