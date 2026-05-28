import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Avatar from "@/Components/Molecules/Avatar";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const EditModal = ({ isOpen, onClose, item, setRefetch }) => {
    const { data, setData, put, processing, errors } = useForm({
        bata_remaining:   0,
        cendol_remaining: 0,
    });

    useEffect(() => {
        if (item) {
            setData({
                bata_remaining:   item.bata_remaining   ?? 0,
                cendol_remaining: item.cendol_remaining ?? 0,
            });
        }
    }, [item]);

    if (!item) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.whistleblow-quota.update", item.id), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Kuota berhasil diperbarui.", timer: 1500, showConfirmButton: false });
                onClose();
                setRefetch((p) => !p);
            },
            onError: (errs) => {
                Swal.fire({ icon: "error", title: "Gagal", text: getInertiaErrorMessage(errs) });
            },
        });
    };

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            title="Kuota Whistleblow"
            type="edit"
            maxWidth="sm"
            onSubmit={handleSubmit}
            onCancel={onClose}
            processing={processing}
        >
            {/* User info */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Avatar
                    imagePath={item.user?.photo_profile}
                    name={item.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-800">{item.user?.name ?? "-"}</p>
                    <p className="text-xs text-gray-400">{item.user?.email ?? ""} · Periode {item.period}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel value="🧱 Kuota Bata" />
                    <TextInput
                        type="number"
                        min="0"
                        max="100"
                        value={data.bata_remaining}
                        onChange={(e) => setData("bata_remaining", parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.bata_remaining} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="🍹 Kuota Cendol" />
                    <TextInput
                        type="number"
                        min="0"
                        max="100"
                        value={data.cendol_remaining}
                        onChange={(e) => setData("cendol_remaining", parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.cendol_remaining} className="mt-1" />
                </div>
            </div>
        </Modal>
    );
};

export default EditModal;
