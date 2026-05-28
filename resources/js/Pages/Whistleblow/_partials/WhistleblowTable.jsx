import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import Card from "@/Components/Atoms/Card";
import Table from "@/Layouts/Table";
import DangerButton from "@/Components/DangerButton";
import ConfirmDeleteModal from "@/Components/Molecules/ConfirmDeleteModal";
import StatusBadge from "@/Components/Molecules/StatusBadge";
import CreateModal from "./CreateModal";
import DetailModal from "./DetailModal";

const TYPE_COLOR = {
    bata:   "danger",
    cendol: "success",
};

const STATUS_COLOR = {
    pending:  "warning",
    reviewed: "info",
    resolved: "success",
};

const WhistleblowTable = () => {
    const [data, setData]                   = useState([]);
    const [currentPage, setCurrentPage]     = useState(1);
    const [totalPages, setTotalPages]       = useState(1);
    const [isLoading, setIsLoading]         = useState(false);
    const [search, setSearch]               = useState("");
    const [refetch, setRefetch]             = useState(false);
    const [isModalOpen, setIsModalOpen]     = useState(false);
    const [isDetailOpen, setIsDetailOpen]   = useState(false);
    const [isDeleteOpen, setIsDeleteOpen]   = useState(false);
    const [isDeleteSelOpen, setIsDeleteSelOpen] = useState(false);
    const [selectedItem, setSelectedItem]   = useState(null);
    const [selectedId, setSelectedId]       = useState(null);
    const [isProcessing, setIsProcessing]   = useState(false);
    const [selectedIds, setSelectedIds]     = useState([]);

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get(route("whistleblow.data"), { params: { page: currentPage, search } })
            .then(({ data: res }) => {
                setData(res.data);
                setTotalPages(res.last_page);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => { fetchData(); }, [currentPage, search, refetch]);

    const openDetail = (row) => {
        axios.get(route("whistleblow.edit", row.id)).then(({ data: res }) => {
            setSelectedItem(res.data);
            setIsDetailOpen(true);
        });
    };

    const handleDelete = () => {
        setIsProcessing(true);
        axios
            .delete(route("whistleblow.destroy", selectedId))
            .then(() => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Laporan dihapus.", timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .finally(() => { setIsProcessing(false); setIsDeleteOpen(false); });
    };

    const handleBulkDelete = () => {
        setIsProcessing(true);
        axios
            .post(route("whistleblow.bulk-delete"), { ids: selectedIds })
            .then(() => {
                Swal.fire({ icon: "success", title: "Berhasil", text: `${selectedIds.length} laporan dihapus.`, timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .finally(() => { setIsProcessing(false); setIsDeleteSelOpen(false); });
    };

    const columns = [
        { header: "Pelapor",         accessor: (row) => row.reporter?.name  ?? "-" },
        { header: "Dilaporkan",      accessor: (row) => row.reported?.name  ?? "-" },
        {
            header: "Tipe",
            accessor: (row) => (
                <StatusBadge status={row.type} colorMap={TYPE_COLOR} label={row.type === "bata" ? "🧱 Bata" : "🍹 Cendol"} />
            ),
            className: "text-center",
        },
        { header: "Tanggal Insiden", accessor: (row) => row.incident_date ?? "-" },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge status={row.status} colorMap={STATUS_COLOR} />
            ),
            className: "text-center",
        },
        {
            header: "Aksi",
            accessor: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => openDetail(row)}
                        className="inline-flex items-center rounded-md bg-blue-500 px-2 py-1.5 text-xs font-semibold uppercase text-white hover:bg-blue-600"
                    >
                        <EyeIcon className="w-4 h-4 me-1" /> Detail
                    </button>
                    <DangerButton
                        onClick={() => { setSelectedId(row.id); setIsDeleteOpen(true); }}
                        className="px-2 py-1.5 text-xs"
                    >
                        <TrashIcon className="w-4 h-4 me-1" /> Hapus
                    </DangerButton>
                </div>
            ),
        },
    ];

    return (
        <Card>
            <Table
                columns={columns}
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onSearch={(q) => { setSearch(q); setCurrentPage(1); }}
                onPageChange={setCurrentPage}
                onAdd={() => setIsModalOpen(true)}
                addType="modal"
                addButtonText="Kirim Laporan"
                selectable={true}
                onDeleteSelected={(ids) => { setSelectedIds(ids); setIsDeleteSelOpen(true); }}
                isProcessing={isLoading}
            />

            <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefetch={setRefetch} />
            <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} item={selectedItem} setRefetch={setRefetch} />

            <ConfirmDeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onDelete={handleDelete}
                title="Hapus Laporan"
                description="Yakin ingin menghapus laporan ini?"
                deleteButtonText="Hapus"
                isProcessing={isProcessing}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteSelOpen}
                onClose={() => setIsDeleteSelOpen(false)}
                onDelete={handleBulkDelete}
                title="Hapus Terpilih"
                description={`Hapus ${selectedIds.length} laporan terpilih?`}
                deleteButtonText="Hapus Terpilih"
                isProcessing={isProcessing}
            />
        </Card>
    );
};

export default WhistleblowTable;
