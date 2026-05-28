import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
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

const STATUS_OPTIONS = [
    { value: "draft",     label: "Draft" },
    { value: "submitted", label: "Submitted" },
    { value: "completed", label: "Selesai" },
];

const EditModal = ({ isOpen, onClose, item, setRefetch }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
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

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-gray-800">Edit Penilaian</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel value="Dinilai" />
                        <TextInput value={item.assessee?.name ?? ""} disabled className="mt-1 block w-full bg-gray-100" />
                    </div>

                    <div>
                        <InputLabel value="Periode" />
                        <TextInput
                            value={data.period}
                            onChange={(e) => setData("period", e.target.value)}
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
                    </div>

                    <div>
                        <InputLabel value="Status" />
                        <SelectBox
                            className="mt-1"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            options={STATUS_OPTIONS}
                        />
                    </div>

                    <div className="col-span-2">
                        <InputLabel value="Catatan" />
                        <TextInput
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>
                </div>

                {data.answers.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-sm text-gray-700 mb-2">Jawaban Kriteria (Skor 1–5)</h3>
                        <div className="space-y-3">
                            {data.answers.map((ans) => {
                                const criteria = item.answers?.find((a) => a.criteria_id === ans.criteria_id);
                                return (
                                    <div key={ans.criteria_id} className="border rounded-md p-3 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-700">{criteria?.criteria?.name ?? `Kriteria #${ans.criteria_id}`}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex gap-2">
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

                <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Batal
                    </button>
                    <SubmitButton processing={processing}>Update</SubmitButton>
                </div>
            </form>
        </Modal>
    );
};

export default EditModal;
