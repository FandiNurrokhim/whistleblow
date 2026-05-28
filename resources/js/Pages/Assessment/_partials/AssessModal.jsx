import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/Atoms/Textarea";
import Avatar from "@/Components/Molecules/Avatar";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const AssessModal = ({ isOpen, user, period, criteriaList = [], onClose, onSuccess }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        assessee_id: "",
        period:      "",
        type:        "staff_to_staff",
        notes:       "",
        answers:     [],
    });

    useEffect(() => {
        if (user && criteriaList.length > 0) {
            setData({
                assessee_id: user.id,
                period,
                type:    "staff_to_staff",
                notes:   "",
                answers: criteriaList.map((c) => ({ criteria_id: c.id, score: 3, note: "" })),
            });
        }
    }, [user, period, criteriaList]);

    if (!user) return null;

    const setAnswer = (criteriaId, field, value) => {
        setData("answers", data.answers.map((a) =>
            a.criteria_id === criteriaId ? { ...a, [field]: value } : a
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assessment.store"), {
            onSuccess,
            onError: (errs) => {
                Swal.fire({ icon: "error", title: "Gagal", text: getInertiaErrorMessage(errs) });
            },
        });
    };

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            title={`Nilai ${user.name}`}
            type="add"
            maxWidth="lg"
            onSubmit={handleSubmit}
            onCancel={() => { onClose(); reset(); }}
            processing={processing}
        >
            {/* User info */}
            <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                <Avatar imagePath={user.photo_profile} name={user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email} · Periode {period}</p>
                </div>
            </div>

            {/* Criteria */}
            {criteriaList.length > 0 ? (
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Berikan penilaian <span className="text-gray-400 font-normal">(Skor 1 = Sangat Kurang, 5 = Sangat Baik)</span>
                    </h3>
                    <div className="space-y-4">
                        {criteriaList.map((c) => {
                            const ans = data.answers.find((a) => a.criteria_id === c.id);
                            return (
                                <div key={c.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                                    {c.description && (
                                        <p className="text-xs text-gray-500 mt-0.5 mb-3 leading-relaxed">{c.description}</p>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-2">
                                        {/* Score buttons */}
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((s) => {
                                                const colors = [
                                                    "", "bg-red-500", "bg-orange-400",
                                                    "bg-yellow-400", "bg-lime-500", "bg-green-500",
                                                ];
                                                const selected = ans?.score === s;
                                                return (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setAnswer(c.id, "score", s)}
                                                        className={`w-9 h-9 rounded-full text-sm font-bold border-2 transition-all ${
                                                            selected
                                                                ? `${colors[s]} border-transparent text-white scale-110 shadow-md`
                                                                : "border-gray-300 text-gray-500 hover:border-gray-400 bg-white"
                                                        }`}
                                                        title={["", "Sangat Kurang", "Kurang", "Cukup", "Baik", "Sangat Baik"][s]}
                                                    >
                                                        {s}
                                                    </button>
                                                );
                                            })}
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
            ) : (
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-sm text-yellow-700">
                    Belum ada kriteria penilaian yang tersedia. Hubungi admin untuk mengaturnya.
                </div>
            )}

            <div>
                <InputLabel value="Catatan Umum (opsional)" />
                <Textarea
                    className="mt-1 block"
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    rows={2}
                    placeholder="Tuliskan catatan atau feedback umum..."
                />
            </div>

            <p className="text-xs text-gray-400">
                🔒 Penilaian Anda bersifat rahasia. Nama Anda tidak akan ditampilkan kepada yang dinilai.
            </p>
        </Modal>
    );
};

export default AssessModal;
