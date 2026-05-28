import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, ArrowPathIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import Card from "@/Components/Atoms/Card";
import Table from "@/Layouts/Table";
import Avatar from "@/Components/Molecules/Avatar";
import ConfirmModal from "@/Components/Molecules/ConfirmModal";
import EditModal from "./EditModal";

const QuotaBadge = ({ value, max, type }) => {
    const pct   = max > 0 ? (value / max) * 100 : 0;
    const color = pct > 60 ? "bg-green-500" : pct > 30 ? "bg-yellow-400" : "bg-red-400";
    const bg    = type === "bata" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700";
    return (
        <div className={`inline-flex flex-col items-center rounded-lg px-3 py-1.5 min-w-[64px] ${bg}`}>
            <span className="text-lg font-bold leading-none">{value}</span>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div className={`h-1 rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
};

const QuotaTable = ({ periodOptions }) => {
    const currentPeriod = periodOptions?.[0] ?? new Date().toISOString().slice(0, 7);

    const [data, setData]               = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [isLoading, setIsLoading]     = useState(false);
    const [search, setSearch]           = useState("");
    const [period, setPeriod]           = useState(currentPeriod);
    const [refetch, setRefetch]         = useState(false);
    const [isEditOpen, setIsEditOpen]   = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isResetOpen, setIsResetOpen]   = useState(false);
    const [isGenOpen, setIsGenOpen]       = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get(route("admin.whistleblow-quota.data"), { params: { page: currentPage, search, period } })
            .then(({ data: res }) => {
                setData(res.data);
                setTotalPages(res.last_page);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => { fetchData(); }, [currentPage, search, period, refetch]);

    const openEdit = (row) => {
        axios.get(route("admin.whistleblow-quota.edit", row.id)).then(({ data: res }) => {
            setSelectedItem(res.data);
            setIsEditOpen(true);
        });
    };

    const handleReset = () => {
        setIsProcessing(true);
        axios
            .post(route("admin.whistleblow-quota.reset"), { period })
            .then(({ data: res }) => {
                Swal.fire({ icon: "success", title: "Berhasil", text: res.message, timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .catch(() => Swal.fire({ icon: "error", title: "Gagal", text: "Gagal mereset kuota." }))
            .finally(() => { setIsProcessing(false); setIsResetOpen(false); });
    };

    const handleGenerate = () => {
        setIsProcessing(true);
        axios
            .post(route("admin.whistleblow-quota.generate"), { period })
            .then(({ data: res }) => {
                Swal.fire({ icon: "success", title: "Berhasil", text: res.message, timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .catch(() => Swal.fire({ icon: "error", title: "Gagal", text: "Gagal generate kuota." }))
            .finally(() => { setIsProcessing(false); setIsGenOpen(false); });
    };

    const columns = [
        {
            header: "Pengguna",
            accessor: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar imagePath={row.user?.photo_profile} name={row.user?.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                        <p className="font-medium text-gray-800">{row.user?.name ?? "-"}</p>
                        <p className="text-xs text-gray-400">{row.user?.email ?? ""}</p>
                    </div>
                </div>
            ),
        },
        { header: "Periode", accessor: (row) => row.period, className: "text-center font-mono" },
        {
            header: "🧱 Bata Tersisa",
            accessor: (row) => <QuotaBadge value={row.bata_remaining} max={3} type="bata" />,
            className: "text-center",
        },
        {
            header: "🍹 Cendol Tersisa",
            accessor: (row) => <QuotaBadge value={row.cendol_remaining} max={5} type="cendol" />,
            className: "text-center",
        },
        {
            header: "Aksi",
            accessor: (row) => (
                <button
                    onClick={() => openEdit(row)}
                    className="inline-flex items-center rounded-md bg-yellow-400 px-2 py-1.5 text-xs font-semibold uppercase text-white hover:bg-yellow-500"
                >
                    <PencilIcon className="w-4 h-4 me-1" /> Edit
                </button>
            ),
            className: "text-center",
        },
    ];

    const toolbarActions = [
        {
            label: "Generate",
            icon: <PlusCircleIcon className="w-5 h-5" />,
            action: () => setIsGenOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white",
        },
        {
            label: "Reset Kuota",
            icon: <ArrowPathIcon className="w-5 h-5" />,
            action: () => setIsResetOpen(true),
            className: "bg-orange-500 hover:bg-orange-600 text-white",
        },
    ];

    return (
        <Card>
            {/* Period filter */}
            <div className="flex items-center gap-2 mb-4">
                <label className="text-sm font-medium text-gray-600">Periode:</label>
                <select
                    value={period}
                    onChange={(e) => { setPeriod(e.target.value); setCurrentPage(1); }}
                    className="rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {periodOptions?.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <Table
                columns={columns}
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onSearch={(q) => { setSearch(q); setCurrentPage(1); }}
                onPageChange={setCurrentPage}
                toolbarActions={toolbarActions}
                isProcessing={isLoading}
            />

            <EditModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                item={selectedItem}
                setRefetch={setRefetch}
            />

            <ConfirmModal
                isOpen={isResetOpen}
                onClose={() => setIsResetOpen(false)}
                onConfirm={handleReset}
                title="Reset Kuota"
                description={`Reset semua kuota ke nilai default untuk periode ${period}? Tindakan ini tidak dapat dibatalkan.`}
                confirmButtonText="Reset"
                buttonClassName="bg-orange-500 hover:bg-orange-600 text-white"
                icon={
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-orange-100 rounded-full">
                        <ArrowPathIcon className="w-6 h-6 text-orange-600" />
                    </div>
                }
                isProcessing={isProcessing}
            />

            <ConfirmModal
                isOpen={isGenOpen}
                onClose={() => setIsGenOpen(false)}
                onConfirm={handleGenerate}
                title="Generate Kuota"
                description={`Buat kuota default untuk semua pengguna yang belum memiliki kuota di periode ${period}.`}
                confirmButtonText="Generate"
                buttonClassName="bg-blue-600 hover:bg-blue-700 text-white"
                icon={
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                        <PlusCircleIcon className="w-6 h-6 text-blue-600" />
                    </div>
                }
                isProcessing={isProcessing}
            />
        </Card>
    );
};

export default QuotaTable;
