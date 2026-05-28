import React from "react";
import { router, useForm } from "@inertiajs/react";

import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import PermissionToggle from "@/Components/Molecules/PermissionToggle";

// utils
import { getInertiaErrorSwal } from "@/Utils/getErrorMessage";

// Translate
import { useTranslation } from "react-i18next";

const EditModal = ({ isOpen, onClose, role, setRefetch }) => {
    if (!role) {
        return null;
    }

    // Translation
    const { t, i18n } = useTranslation();

    const { data, setData, put, processing, errors, reset } = useForm({
        name: role.name || "",
        permission: role.permission || [],
        message: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(`/Admin/role/${role.id}`, {
            ...data,
            _method: "put",
        }, {
            onSuccess: () => {
                reset();
                onClose();
                setRefetch((prev) => !prev);
                Swal.fire({
                    icon: "success",
                    title: t("global.swalSuccess"),
                    text: t("role.pageTitle") + " " + t("global.updatedMessage"),
                });
            },
            onError: (errors) => {
                Swal.fire(getInertiaErrorSwal(errors));
            },
        });
    };

    return (
        <Modal show={isOpen}
            onClose={onClose}
            title={t("category.pageTitle")}
            type="edit"
            maxWidth="2xl"
            onCancel={() => {
                onClose();
                reset();
            }}
            processing={processing}
            onSubmit={handleSubmit}>

            <div>
                <InputLabel htmlFor="name" value={`${t("global.name")}`} />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                    required
                    autoComplete="name"
                    placeholder={`${t("global.name")} ${t("role.pageTitle")}`}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <PermissionToggle
                value={data.permission}
                onChange={val => setData("permission", val)}
            />
        </Modal>
    );
};

export default EditModal;