import React, { useRef, useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "react-i18next";

const UploadInputWithPreview = ({
    id,
    name,
    label,
    accept = ".pdf,.jpg,.jpeg,.png",
    value,
    onChange,
    error,
    required = false,
    maxSizeMB = 1,
}) => {
    // Translate
    const { t } = useTranslation();
    const inputRef = useRef();
    const [sizeError, setSizeError] = useState("");

    const formatSize = (sizeMB) => {
        return sizeMB >= 1
            ? `${sizeMB.toFixed(1)} MB`
            : `${(sizeMB * 1024).toFixed(0)} KB`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > maxSizeMB * 1024 * 1024) {
            const formattedSize = formatSize(maxSizeMB);
            setSizeError(`${label} ${t("global.maxSizeError", { max: formattedSize })}`);
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

    return (
        <div>
            <label htmlFor={id} className="block text-sm mb-1">
                {t("global.upload")} {label}
                <span className="text-xs text-gray-500 ml-1">({accept}) {required && <span className="text-red-500 ml-1">*</span>}</span>
            </label>
            {!value ? (
                <label
                    className="relative flex items-center w-full border border-gray-200 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600 cursor-pointer"
                >
                    <span className="inline-flex items-center justify-center mr-2">
                        <img src="/assets/icons/upload.svg" alt="PDF Icon" className="h-6 w-6" />
                    </span>
                    <div
                        className="font-medium text-gray-500 bg-gray-300 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer"
                    >
                        {t("global.chooseFile")}
                    </div>
                    <input
                        ref={inputRef}
                        id={id}
                        name={name}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        required={required && !value}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="ml-4 text-xs text-gray-400 select-none pointer-events-none">
                        {t("global.noFileSelected")}
                    </span>
                </label>
            ) : (
                <div
                    className="flex items-center border border-gray-300 rounded-md p-2 text-xs text-green-600"
                    role="alert"
                    aria-live="polite"
                >
                    <span className="inline-flex items-center justify-center mr-2">
                        <img src="/assets/icons/upload.svg" alt="PDF Icon" className="h-6 w-6" />
                    </span>
                    <span className="flex-1">{t("global.fileUploaded")}</span>
                    {typeof value === "string" && (
                        <button
                            type="button"
                            aria-label="View uploaded file"
                            className="text-gray-700 hover:text-gray-900 focus:outline-none"
                            onClick={handlePreview}
                        >
                            <EyeIcon className="h-5 w-5 inline" />
                        </button>
                    )}
                    <button
                        type="button"
                        className="text-red-600 hover:text-red-800 ml-2"
                        title="Hapus file"
                        onClick={handleRemove}
                    >
                        <XMarkIcon className="h-5 w-5 inline" />
                    </button>
                </div>
            )}
            <input
                ref={inputRef}
                id={`hidden_${id}`}
                name={name}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                required={required && !value}
                className="hidden"
            />
            {(error || sizeError) && <div className="text-red-600 text-sm mt-1">{error || sizeError}</div>}
        </div>
    );
};

export default UploadInputWithPreview;