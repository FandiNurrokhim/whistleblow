import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Textarea from "@/Components/Atoms/Textarea";
import Checkbox from "@/Components/Checkbox";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const CreateModal = ({ isOpen, onClose, setRefetch }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name:           "",
        description:    "",
        weight_manager: "",
        weight_staff:   "",
        is_active:      true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assessment-criteria.store"), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Kriteria berhasil ditambahkan.", timer: 1500 });
                reset();
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
            title="Kriteria Penilaian"
            type="add"
            maxWidth="md"
            onSubmit={handleSubmit}
            onCancel={() => { onClose(); reset(); }}
            processing={processing}
        >
            <div>
                <InputLabel value="Nama Kriteria" />
                <TextInput
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="Contoh: Komunikasi, Integritas, Kedisiplinan..."
                />
                <InputError message={errors.name} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Deskripsi (opsional)" />
                <Textarea
                    className="mt-1 block"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    rows={3}
                    placeholder="Penjelasan singkat tentang kriteria ini..."
                />
                <InputError message={errors.description} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel value="Bobot Manajer (%)" />
                    <TextInput
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={data.weight_manager}
                        onChange={(e) => setData("weight_manager", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.weight_manager} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Bobot Staff (%)" />
                    <TextInput
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={data.weight_staff}
                        onChange={(e) => setData("weight_staff", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.weight_staff} className="mt-1" />
                </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData("is_active", checked)}
                />
                <span className="text-sm text-gray-700 select-none">Aktif</span>
            </label>
        </Modal>
    );
};

export default CreateModal;
