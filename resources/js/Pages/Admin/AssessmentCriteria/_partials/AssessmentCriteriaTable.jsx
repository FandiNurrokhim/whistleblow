import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import Card from "@/Components/Atoms/Card";
import Table from "@/Layouts/Table";
import DangerButton from "@/Components/DangerButton";
import ConfirmDeleteModal from "@/Components/Molecules/ConfirmDeleteModal";
import StatusBadge from "@/Components/Molecules/StatusBadge";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";

const AssessmentCriteriaTable = () => {
    const [data, setData]                   = useState([]);
    const [currentPage, setCurrentPage]     = useState(1);
    const [totalPages, setTotalPages]       = useState(1);
    const [isLoading, setIsLoading]         = useState(false);
    const [search, setSearch]               = useState("");
    const [refetch, setRefetch]             = useState(false);
    const [isModalOpen, setIsModalOpen]     = useState(false);
    const [isEditOpen, setIsEditOpen]       = useState(false);
    const [isDeleteOpen, setIsDeleteOpen]   = useState(false);
    const [isDeleteSelOpen, setIsDeleteSelOpen] = useState(false);
    const [selectedItem, setSelectedItem]   = useState(null);
    const [selectedId, setSelectedId]       = useState(null);
    const [isProcessing, setIsProcessing]   = useState(false);
    const [selectedIds, setSelectedIds]     = useState([]);

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get(route("assessment-criteria.data"), { params: { page: currentPage, search } })
            .then(({ data: res }) => {
                setData(res.data);
                setTotalPages(res.last_page);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => { fetchData(); }, [currentPage, search, refetch]);

    const openEdit = (row) => {
        axios.get(route("assessment-criteria.edit", row.id)).then(({ data: res }) => {
            setSelectedItem(res.data);
            setIsEditOpen(true);
        });
    };

    const handleDelete = () => {
        setIsProcessing(true);
        axios
            .delete(route("assessment-criteria.destroy", selectedId))
            .then(() => {
                Swal.fire({ icon: "success", title: "Berhasil", text: "Kriteria dihapus.", timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .finally(() => { setIsProcessing(false); setIsDeleteOpen(false); });
    };

    const handleBulkDelete = () => {
        setIsProcessing(true);
        axios
            .post(route("assessment-criteria.bulk-delete"), { ids: selectedIds })
            .then(() => {
                Swal.fire({ icon: "success", title: "Berhasil", text: `${selectedIds.length} kriteria dihapus.`, timer: 1500, showConfirmButton: false });
                setRefetch((p) => !p);
            })
            .finally(() => { setIsProcessing(false); setIsDeleteSelOpen(false); });
    };

    const columns = [
        { header: "Nama Kriteria", accessor: (row) => row.name ?? "-" },
        { header: "Deskripsi",     accessor: (row) => row.description ?? "-" },
        { header: "Bobot Manajer", accessor: (row) => `${row.weight_manager}%`, className: "text-center" },
        { header: "Bobot Staff",   accessor: (row) => `${row.weight_staff}%`,   className: "text-center" },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge
                    status={row.is_active ? "active" : "inactive"}
                    colorMap={{ active: "success", inactive: "danger" }}
                />
            ),
            className: "text-center",
        },
        {
            header: "Aksi",
            accessor: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => openEdit(row)}
                        className="inline-flex items-center rounded-md bg-yellow-400 px-2 py-1.5 text-xs font-semibold uppercase text-white hover:bg-yellow-500"
                    >
                        <PencilIcon className="w-4 h-4 me-1" /> Edit
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
                addButtonText="Tambah Kriteria"
                selectable={true}
                onDeleteSelected={(ids) => { setSelectedIds(ids); setIsDeleteSelOpen(true); }}
                isProcessing={isLoading}
            />

            <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefetch={setRefetch} />
            <EditModal   isOpen={isEditOpen}  onClose={() => setIsEditOpen(false)}  item={selectedItem} setRefetch={setRefetch} />

            <ConfirmDeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onDelete={handleDelete}
                title="Hapus Kriteria"
                description="Yakin ingin menghapus kriteria ini?"
                deleteButtonText="Hapus"
                isProcessing={isProcessing}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteSelOpen}
                onClose={() => setIsDeleteSelOpen(false)}
                onDelete={handleBulkDelete}
                title="Hapus Terpilih"
                description={`Hapus ${selectedIds.length} kriteria terpilih?`}
                deleteButtonText="Hapus Terpilih"
                isProcessing={isProcessing}
            />
        </Card>
    );
};

export default AssessmentCriteriaTable;
