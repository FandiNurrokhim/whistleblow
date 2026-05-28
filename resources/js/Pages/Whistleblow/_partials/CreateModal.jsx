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
import Textarea from "@/Components/Atoms/Textarea";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const TYPE_OPTIONS = [
    { value: "bata", label: "🧱 Bata — Laporkan Insiden / Pelanggaran" },
    { value: "cendol", label: "🍹 Cendol — Apresiasi Budaya Kerja Baik" },
];

const CreateModal = ({ isOpen, onClose, setRefetch }) => {
    const [users, setUsers] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        reported_id: "",
        type: "bata",
        reason: "",
        incident_date: "",
    });

    useEffect(() => {
        if (isOpen) {
            axios.get(route("admin.user.select-data")).then(({ data: res }) => setUsers(res.data ?? [])).catch(() => { });
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("whistleblow.store"), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Laporan berhasil dikirim.", timer: 1500, showConfirmButton: false });
                reset();
                onClose();
                setRefetch((p) => !p);
            },
            onError: (errs) => {
                const msg = errs.error ?? getInertiaErrorMessage(errs);
                Swal.fire({ icon: "error", title: "Gagal", text: msg });
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} title="Tambah Laporan Bata/Cendol"
            type="add"
            maxWidth="md"
            onCancel={() => {
                onClose();
                reset();
            }}
            processing={processing}
            onSubmit={handleSubmit}
        >
            <div>
                <InputLabel value="Tipe Laporan" />
                <div className="mt-1 flex flex-col gap-2">
                    {TYPE_OPTIONS.map((o) => (
                        <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value={o.value}
                                checked={data.type === o.value}
                                onChange={() => setData("type", o.value)}
                                className="text-indigo-600"
                            />
                            <span className="text-sm text-gray-700">{o.label}</span>
                        </label>
                    ))}
                </div>
                <InputError message={errors.type} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Orang yang Dilaporkan" />
                <SelectBox
                    className="mt-1"
                    placeholder="-- Pilih --"
                    value={data.reported_id}
                    onChange={(e) => setData("reported_id", e.target.value)}
                    options={users.map((u) => ({ value: u.id, label: u.name }))}
                />
                <InputError message={errors.reported_id} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Tanggal Insiden" />
                <TextInput
                    type="date"
                    value={data.incident_date}
                    onChange={(e) => setData("incident_date", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.incident_date} className="mt-1" />
            </div>

            <div>
                <InputLabel value={data.type === "bata" ? "Alasan / Insiden" : "Alasan Apresiasi"} />
                <Textarea
                    className="mt-1 block"
                    value={data.reason}
                    onChange={(e) => setData("reason", e.target.value)}
                    rows={4}
                    maxLength={1000}
                    placeholder={
                        data.type === "bata"
                            ? "Jelaskan insiden atau pelanggaran yang terjadi..."
                            : "Jelaskan kontribusi positif atau budaya kerja baik yang dilakukan..."
                    }
                />
                <p className="text-xs text-gray-400 mt-1">{data.reason.length}/1000</p>
                <InputError message={errors.reason} className="mt-1" />
            </div>
        </Modal>
    );
};

export default CreateModal;
