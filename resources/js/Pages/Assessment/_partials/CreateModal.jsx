import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SubmitButton from "@/Components/Atoms/SubmitButton";
import SelectBox from "@/Components/Atoms/SelectBox";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const TYPE_OPTIONS = [
    { value: "manager_to_staff", label: "Manajer → Staff" },
    { value: "staff_to_staff",   label: "Staff → Staff" },
];

const CreateModal = ({ isOpen, onClose, setRefetch }) => {
    const [users, setUsers]         = useState([]);
    const [criteria, setCriteria]   = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        assessee_id: "",
        period:      "",
        type:        "staff_to_staff",
        notes:       "",
        answers:     [],
    });

    useEffect(() => {
        if (isOpen) {
            axios.get(route("assessment-criteria.select-data")).then(({ data: res }) => setCriteria(res.data ?? []));
            axios.get(route("admin.user.select-data")).catch(() =>
                axios.get(route("admin.user.index")).then(({ data: res }) => setUsers(res.data ?? []))
            ).then(({ data: res } = {}) => res && setUsers(res.data ?? []));
        }
    }, [isOpen]);

    useEffect(() => {
        if (criteria.length > 0) {
            setData("answers", criteria.map((c) => ({ criteria_id: c.id, score: 3, note: "" })));
        }
    }, [criteria]);

    const setAnswer = (criteriaId, field, value) => {
        setData("answers", data.answers.map((a) =>
            a.criteria_id === criteriaId ? { ...a, [field]: value } : a
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assessment.store"), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Penilaian berhasil disimpan.", timer: 1500, showConfirmButton: false });
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
        <Modal show={isOpen} onClose={onClose} maxWidth="lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-gray-800">Tambah Penilaian</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel value="Yang Dinilai" />
                        <SelectBox
                            className="mt-1"
                            placeholder="-- Pilih --"
                            value={data.assessee_id}
                            onChange={(e) => setData("assessee_id", e.target.value)}
                            options={users.map((u) => ({ value: u.id, label: u.name }))}
                        />
                        <InputError message={errors.assessee_id} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel value="Periode (YYYY-MM)" />
                        <TextInput
                            value={data.period}
                            onChange={(e) => setData("period", e.target.value)}
                            placeholder="2025-05"
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.period} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel value="Tipe Penilaian" />
                        <SelectBox
                            className="mt-1"
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            options={TYPE_OPTIONS}
                        />
                        <InputError message={errors.type} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel value="Catatan (opsional)" />
                        <TextInput
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>
                </div>

                {criteria.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-sm text-gray-700 mb-2">Penilaian per Kriteria (Skor 1–5)</h3>
                        <div className="space-y-3">
                            {criteria.map((c) => {
                                const ans = data.answers.find((a) => a.criteria_id === c.id);
                                return (
                                    <div key={c.id} className="border rounded-md p-3 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-700">{c.name}</p>
                                        {c.description && <p className="text-xs text-gray-500 mb-2">{c.description}</p>}
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setAnswer(c.id, "score", s)}
                                                        className={`w-8 h-8 rounded-full text-sm font-semibold border-2 transition-colors ${
                                                            ans?.score === s
                                                                ? "bg-blue-600 border-blue-600 text-white"
                                                                : "border-gray-300 text-gray-600 hover:border-blue-400"
                                                        }`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                            <TextInput
                                                value={ans?.note ?? ""}
                                                onChange={(e) => setAnswer(c.id, "note", e.target.value)}
                                                placeholder="Catatan (opsional)"
                                                className="flex-1 text-sm"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
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
