import React from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import SecondaryButton from "@/Components/SecondaryButton";

// Translate
import { useTranslation } from "react-i18next";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
    confirmButtonText = "Confirm",
    icon = null,
    buttonClassName = "bg-blue-600 hover:bg-blue-700 text-white",
    isProcessing = false,
    children = null,
}) => {

    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm();
    };

    return (
        <Transition show={isOpen} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={onClose}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full max-w-md`}
                    >
                        <form onSubmit={handleSubmit} className="p-6">
                            {icon && (
                                <div className="flex justify-center mb-4">
                                    {icon}
                                </div>
                            )}
                            <h2 className="text-lg font-medium text-center text-gray-900">{title}</h2>
                            <p className="mt-2 text-sm text-center text-gray-600">{description}</p>

                            {children && (
                                <div>
                                    {children}
                                </div>
                            )}

                            <div className={`flex gap-3 ${children ? 'mt-6' : 'mt-6'} justify-center`}>
                                <SecondaryButton onClick={onClose} disabled={isProcessing}>
                                    {t("global.cancel")}
                                </SecondaryButton>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
                                >
                                    {isProcessing ? t("global.processing") : confirmButtonText}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
};

export default ConfirmModal;