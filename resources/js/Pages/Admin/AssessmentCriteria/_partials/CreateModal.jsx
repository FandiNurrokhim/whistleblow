import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SubmitButton from "@/Components/Atoms/SubmitButton";
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
                Swal.fire({ icon: "success", title: "Berhasil", text: "Kriteria berhasil ditambahkan.", timer: 1500, showConfirmButton: false });
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
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Tambah Kriteria Penilaian</h2>

                <div>
                    <InputLabel value="Nama Kriteria" />
                    <TextInput
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Contoh: Komunikasi, Integritas, dst."
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Deskripsi (opsional)" />
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        placeholder="Penjelasan kriteria ini..."
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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={data.is_active}
                        onChange={(e) => setData("is_active", e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600"
                    />
                    <label htmlFor="is_active" className="text-sm text-gray-700">Aktif</label>
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Batal
                    </button>
                    <SubmitButton processing={processing}>Simpan</SubmitButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateModal;
