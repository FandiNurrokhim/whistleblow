import React from "react";
import { useTranslation } from "react-i18next";

const COLOR_CLASS = {
    success: "bg-green-100 text-green-800",
    danger:  "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info:    "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
};

/**
 * StatusBadge — dua mode:
 *
 * Mode 1 (boolean):
 *   <StatusBadge value={true/false} />
 *   → Aktif (hijau) / Non Aktif (merah)
 *
 * Mode 2 (string + colorMap):
 *   <StatusBadge status="pending" colorMap={{ pending: "warning", resolved: "success" }} label="Menunggu" />
 *   → teks custom dengan warna dari colorMap
 */
const StatusBadge = ({ value, status, colorMap, label }) => {
    const { t } = useTranslation();

    // Mode 2: string status dengan colorMap
    if (status !== undefined) {
        const colorKey   = colorMap?.[status] ?? "default";
        const colorClass = COLOR_CLASS[colorKey] ?? COLOR_CLASS.default;
        const displayText = label ?? status;

        return (
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded capitalize ${colorClass}`}>
                {displayText}
            </span>
        );
    }

    // Mode 1: boolean value
    return value ? (
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
            {t("global.active")}
        </span>
    ) : (
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
            {t("global.inactive")}
        </span>
    );
};

export default StatusBadge;
