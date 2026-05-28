import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import Select from "react-select";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Textarea from "@/Components/Atoms/Textarea";
import StatusBadge from "@/Components/Molecules/StatusBadge";

const STATUS_OPTIONS = [
    { value: "pending",  label: "Pending" },
    { value: "reviewed", label: "Ditinjau" },
    { value: "resolved", label: "Selesai" },
];

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

    const selectedStatus = STATUS_OPTIONS.find((o) => o.value === data.status) || null;

    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            title="Laporan Whistleblow"
            type="edit"
            maxWidth="md"
            onSubmit={handleSubmit}
            onCancel={onClose}
            processing={processing}
        >
            {/* Info panel laporan */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
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
                    <p className="bg-white border rounded-md p-2 text-gray-800 leading-relaxed">{item.reason}</p>
                </div>
            </div>

            <div>
                <InputLabel value="Update Status" />
                <Select
                    options={STATUS_OPTIONS}
                    value={selectedStatus}
                    onChange={(opt) => setData("status", opt ? opt.value : "pending")}
                    isClearable={false}
                    menuPlacement="auto"
                    menuShouldScrollIntoView={false}
                    className="mt-1"
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
        </Modal>
    );
};

export default DetailModal;
