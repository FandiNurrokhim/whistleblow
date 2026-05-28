import React from "react";
import { useTranslation } from "react-i18next";

const StatusBadge = ({ value }) => {

    const { t } = useTranslation();

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