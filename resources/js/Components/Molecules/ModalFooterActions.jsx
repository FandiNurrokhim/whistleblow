import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useTranslation } from "react-i18next";
import { Spinner } from "@material-tailwind/react";

const ModalFooterActions = ({
    onCancel,
    processing = false,
}) => {
    const { t } = useTranslation();

    return (
        <div className="mt-6 flex justify-end">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                {t("global.cancel")}
            </button>
            <PrimaryButton className="ml-3 flex items-center justify-center" disabled={processing}>
                {processing && (
                    <span className="mr-2">
                        <Spinner className="h-4 w-4 animate-spin" />
                    </span>
                )}
                {processing ? t("global.saving") : t("global.save")}
            </PrimaryButton>
        </div>
    )
};

export default ModalFooterActions;