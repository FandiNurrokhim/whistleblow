import React from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

// Translate
import { useTranslation } from "react-i18next";

const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onDelete,
    title = "Are you sure?",
    description = "Once deleted, this action cannot be undone.",
    deleteButtonText = "Delete",
    isProcessing = false,
}) => {

    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onDelete();
    };

    return (
        <Transition show={isOpen} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={close}
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
                        className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-ful max-w-2xl`}
                    >
                        <form onSubmit={handleSubmit} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                            <p className="mt-1 text-sm text-gray-600">{description}</p>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={onClose}>{t("global.cancel")}</SecondaryButton>
                                <DangerButton className="ml-3" disabled={isProcessing}>
                                    {isProcessing ? t("global.processing") : deleteButtonText}
                                </DangerButton>
                            </div>
                        </form>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
};

export default ConfirmDeleteModal;