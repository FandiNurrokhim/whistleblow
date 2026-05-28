import React from "react";
import { useTranslation } from "react-i18next";
import InputLabel from "@/Components/InputLabel";

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
    selectedStatusKey = "global.selectedStatus",
}) => {
    const { t } = useTranslation();

    const isActive = value === true || value === 1;
    const isInactive = value === false || value === 0;

    const activeText = activeLabel ?? t(activeKey);
    const inactiveText = inactiveLabel ?? t(inactiveKey);

    return (
        <div className="flex flex-col">
            <InputLabel htmlFor={name} value={label} required={required} />

            <span className="text-xs text-gray-500 mb-1">
                {t(selectedStatusKey)}:{" "}
                <span className="font-semibold">
                    {isActive ? activeText : inactiveText}
                </span>
            </span>

            <div
                role="radiogroup"
                aria-label={label}
                className="inline-flex rounded-md mt-2"
            >
                <button
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={`px-6 py-2 cursor-pointer border border-gray-200 rounded-l-md transition-colors focus:outline-none ${
                        isActive
                            ? "text-white bg-blue-600 hover:bg-blue-700"
                            : "text-gray-600 hover:bg-blue-100"
                    }`}
                    onClick={() => onChange(true)}
                    id={`${name}-active`}
                >
                    {activeText}
                </button>

                <button
                    type="button"
                    role="radio"
                    aria-checked={isInactive}
                    className={`px-6 py-2 cursor-pointer border border-gray-200 rounded-r-md transition-colors focus:outline-none ${
                        isInactive
                            ? "text-white bg-blue-600 hover:bg-blue-700"
                            : "text-gray-600 hover:bg-blue-100"
                    }`}
                    onClick={() => onChange(false)}
                    id={`${name}-inactive`}
                >
                    {inactiveText}
                </button>
            </div>
        </div>
    );
};

export default ActiveToggle;