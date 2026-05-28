import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Textarea from "@/Components/Atoms/Textarea";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const TYPE_OPTIONS = [
    { value: "manager_to_staff", label: "Manajer → Staff" },
    { value: "staff_to_staff",   label: "Staff → Staff" },
];

const CreateModal = ({ isOpen, onClose, setRefetch }) => {
    const [users, setUsers]       = useState([]);
    const [criteria, setCriteria] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        assessee_id: "",
        period:      "",
        type:        "staff_to_staff",
        notes:       "",
        answers:     [],
    });

    useEffect(() => {
        if (!isOpen) return;
        axios.get(route("assessment-criteria.select-data"))
            .then(({ data: res }) => setCriteria(res.data ?? []));
        axios.get(route("admin.user.select-data"))
            .then(({ data: res }) => setUsers(res.data ?? []));
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

    const userOptions    = users.map((u) => ({ value: u.id, label: u.name }));
    const selectedUser   = userOptions.find((o) => o.value == data.assessee_id) || null;
    const selectedType   = TYPE_OPTIONS.find((o) => o.value === data.type) || null;

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            title="Penilaian"
            type="add"
            maxWidth="lg"
            onSubmit={handleSubmit}
            onCancel={() => { onClose(); reset(); }}
            processing={processing}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel value="Yang Dinilai" />
                    <Select
                        options={userOptions}
                        value={selectedUser}
                        onChange={(opt) => setData("assessee_id", opt ? opt.value : "")}
                        placeholder="-- Pilih Karyawan --"
                        isClearable
                        menuPlacement="auto"
                        menuShouldScrollIntoView={false}
                        className="mt-1"
                    />
                    <InputError message={errors.assessee_id} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Periode" />
                    <TextInput
                        type="month"
                        value={data.period}
                        onChange={(e) => setData("period", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.period} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Tipe Penilaian" />
                    <Select
                        options={TYPE_OPTIONS}
                        value={selectedType}
                        onChange={(opt) => setData("type", opt ? opt.value : "staff_to_staff")}
                        placeholder="-- Pilih Tipe --"
                        isClearable={false}
                        menuPlacement="auto"
                        menuShouldScrollIntoView={false}
                        className="mt-1"
                    />
                    <InputError message={errors.type} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Catatan (opsional)" />
                    <Textarea
                        className="mt-1 block"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        rows={2}
                    />
                </div>
            </div>

            {criteria.length > 0 && (
                <div>
                    <h3 className="font-semibold text-sm text-gray-700 mb-3">
                        Penilaian per Kriteria <span className="text-gray-400 font-normal">(Skor 1–5)</span>
                    </h3>
                    <div className="space-y-3">
                        {criteria.map((c) => {
                            const ans = data.answers.find((a) => a.criteria_id === c.id);
                            return (
                                <div key={c.id} className="border rounded-lg p-3 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-800">{c.name}</p>
                                    {c.description && (
                                        <p className="text-xs text-gray-500 mt-0.5 mb-2">{c.description}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex gap-1.5">
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
        </Modal>
    );
};

export default CreateModal;
