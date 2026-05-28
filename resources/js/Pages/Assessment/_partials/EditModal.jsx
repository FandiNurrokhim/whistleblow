import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
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

const STATUS_OPTIONS = [
    { value: "draft",     label: "Draft" },
    { value: "submitted", label: "Submitted" },
    { value: "completed", label: "Selesai" },
];

const EditModal = ({ isOpen, onClose, item, setRefetch }) => {
    const { data, setData, put, processing, errors } = useForm({
        assessee_id: "",
        period:      "",
        type:        "staff_to_staff",
        status:      "draft",
        notes:       "",
        answers:     [],
    });

    useEffect(() => {
        if (item) {
            setData({
                assessee_id: item.assessee_id ?? "",
                period:      item.period      ?? "",
                type:        item.type        ?? "staff_to_staff",
                status:      item.status      ?? "draft",
                notes:       item.notes       ?? "",
                answers:     (item.answers ?? []).map((a) => ({
                    criteria_id: a.criteria_id,
                    score:       a.score,
                    note:        a.note ?? "",
                })),
            });
        }
    }, [item]);

    if (!item) return null;

    const setAnswer = (criteriaId, field, value) => {
        setData("answers", data.answers.map((a) =>
            a.criteria_id === criteriaId ? { ...a, [field]: value } : a
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("assessment.update", item.id), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Penilaian diperbarui.", timer: 1500, showConfirmButton: false });
                onClose();
                setRefetch((p) => !p);
            },
            onError: (errs) => {
                Swal.fire({ icon: "error", title: "Gagal", text: getInertiaErrorMessage(errs) });
            },
        });
    };

    const selectedType   = TYPE_OPTIONS.find((o) => o.value === data.type)   || null;
    const selectedStatus = STATUS_OPTIONS.find((o) => o.value === data.status) || null;

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            title="Penilaian"
            type="edit"
            maxWidth="lg"
            onSubmit={handleSubmit}
            onCancel={onClose}
            processing={processing}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel value="Dinilai" />
                    <TextInput
                        value={item.assessee?.name ?? ""}
                        disabled
                        className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                    />
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
                        isClearable={false}
                        menuPlacement="auto"
                        menuShouldScrollIntoView={false}
                        className="mt-1"
                    />
                </div>

                <div>
                    <InputLabel value="Status" />
                    <Select
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        onChange={(opt) => setData("status", opt ? opt.value : "draft")}
                        isClearable={false}
                        menuPlacement="auto"
                        menuShouldScrollIntoView={false}
                        className="mt-1"
                    />
                </div>

                <div className="md:col-span-2">
                    <InputLabel value="Catatan" />
                    <Textarea
                        className="mt-1 block"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        rows={2}
                    />
                </div>
            </div>

            {data.answers.length > 0 && (
                <div>
                    <h3 className="font-semibold text-sm text-gray-700 mb-3">
                        Jawaban Kriteria <span className="text-gray-400 font-normal">(Skor 1–5)</span>
                    </h3>
                    <div className="space-y-3">
                        {data.answers.map((ans) => {
                            const refAnswer = item.answers?.find((a) => a.criteria_id === ans.criteria_id);
                            return (
                                <div key={ans.criteria_id} className="border rounded-lg p-3 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-800">
                                        {refAnswer?.criteria?.name ?? `Kriteria #${ans.criteria_id}`}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => setAnswer(ans.criteria_id, "score", s)}
                                                    className={`w-8 h-8 rounded-full text-sm font-semibold border-2 transition-colors ${
                                                        ans.score === s
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "border-gray-300 text-gray-600 hover:border-blue-400"
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <TextInput
                                            value={ans.note}
                                            onChange={(e) => setAnswer(ans.criteria_id, "note", e.target.value)}
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

export default EditModal;
