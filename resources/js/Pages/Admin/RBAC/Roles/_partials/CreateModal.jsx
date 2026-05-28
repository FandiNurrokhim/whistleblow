import React from "react";
import Swal from "sweetalert2";
import Modal from '@/Components/Modal';
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import PermissionToggle from "@/Components/Molecules/PermissionToggle";

// Utils
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

// Translation
import { useTranslation } from "react-i18next";

const CreateModal = ({ isOpen, onClose, setRefetch }) => {

    // Translation
    const { t, i18n } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permission: [],
        message: "",
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
                Swal.fire({
                    icon: "success",
                    title: t("global.swalSuccess"),
                    text: t("role.createdMessage"),
                });
            },
            onError: (errors) => {
                const errorMessage = getInertiaErrorMessage(errors.message, i18n.language);
                Swal.fire("Error!", errorMessage, "error");
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} title={t("role.pageTitle")}
            type="add"
            maxWidth="2xl"
            onCancel={() => {
                onClose();
                reset();
            }
            }
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

export default CreateModal;
