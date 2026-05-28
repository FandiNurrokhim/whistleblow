import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DangerButton from "@/Components/DangerButton";
import { useTranslation } from "react-i18next";

const TableActionButtons = ({
    onEdit,
    onDelete,
    isPermanentDelete = false,
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex gap-2 justify-center">
            <button
                onClick={onEdit}
                className="inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700"
            >
                <PencilIcon className="w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" />
                <span>{t("global.edit")}</span>
            </button>
            <DangerButton
                onClick={onDelete}
                className={
                    isPermanentDelete
                        ? "bg-red-700 hover:bg-red-800 focus:ring-red-900"
                        : "bg-red-500 hover:bg-red-600 focus:ring-red-700"
                }
            >
                <TrashIcon
                    className={
                        "w-5 h-5 me-2 rounded-full p-1 text-white " +
                        (isPermanentDelete ? "bg-red-600" : "bg-red-400")
                    }
                />
                <span>
                    {isPermanentDelete
                        ? t("global.deletePermanent")
                        : t("global.delete")}
                </span>
            </DangerButton>
        </div>
    );
};

export default TableActionButtons;