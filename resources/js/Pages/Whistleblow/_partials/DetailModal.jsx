import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SubmitButton from "@/Components/Atoms/SubmitButton";
import SelectBox from "@/Components/Atoms/SelectBox";
import Textarea from "@/Components/Atoms/Textarea";
import StatusBadge from "@/Components/Molecules/StatusBadge";

const STATUS_OPTIONS = [
    { value: "pending",  label: "Pending" },
    { value: "reviewed", label: "Ditinjau" },
    { value: "resolved", label: "Selesai" },
];

const STATUS_COLOR = { pending: "warning", reviewed: "info", resolved: "success" };

const DetailModal = ({ isOpen, onClose, item, setRefetch }) => {
    const { data, setData, put, processing, errors } = useForm({
        status:      "pending",
        admin_notes: "",
    });

    useEffect(() => {
        if (item) {
            setData({ status: item.status ?? "pending", admin_notes: item.admin_notes ?? "" });
        }
    }, [item]);

    if (!item) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("whistleblow.update-status", item.id), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Status laporan diperbarui.", timer: 1500, showConfirmButton: false });
                onClose();
                setRefetch((p) => !p);
            },
            onError: () => {
                Swal.fire({ icon: "error", title: "Gagal", text: "Gagal memperbarui status." });
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Detail Laporan Whistleblow</h2>

                <div className="bg-gray-50 rounded-md p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Pelapor</span>
                        <span className="font-medium">{item.reporter?.name ?? "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Dilaporkan</span>
                        <span className="font-medium">{item.reported?.name ?? "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Tipe</span>
                        <StatusBadge
                            status={item.type}
                            colorMap={{ bata: "danger", cendol: "success" }}
                            label={item.type === "bata" ? "🧱 Bata" : "🍹 Cendol"}
                        />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Tanggal Insiden</span>
                        <span className="font-medium">{item.incident_date ?? "-"}</span>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-1">Alasan</p>
                        <p className="text-gray-800 bg-white border rounded p-2">{item.reason}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <InputLabel value="Update Status" />
                        <SelectBox
                            className="mt-1"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            options={STATUS_OPTIONS}
                        />
                        <InputError message={errors.status} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel value="Catatan Admin (opsional)" />
                        <Textarea
                            className="mt-1 block"
                            value={data.admin_notes}
                            onChange={(e) => setData("admin_notes", e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                            Tutup
                        </button>
                        <SubmitButton processing={processing}>Simpan Status</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default DetailModal;
