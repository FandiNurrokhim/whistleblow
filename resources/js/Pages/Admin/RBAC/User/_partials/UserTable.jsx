import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "@/Layouts/Table";
import ConfirmDeleteModal from "@/Components/Molecules/ConfirmDeleteModal";
import DangerButton from '@/Components/DangerButton';
import CreateUserModal from "./CreateModal";
import EditModal from "./EditModal";
import Card from "@/Components/Atoms/Card";
import Avatar from "@/Components/Molecules/Avatar";

import ConfirmModal from "@/Components/Molecules/ConfirmModal";
// Utlis
import { getErrorMessage } from "@/Utils/getErrorMessage";
import { getCountryName, getStateName, getCountryFlagUrl } from "@/Utils/countryStateHelper";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";

// Translate
import { useTranslation } from "react-i18next";

const UserTable = () => {

    // Translation
    const { t, i18n } = useTranslation();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const openEditModal = (user) => {
        axios
            .get(`/admin/user/${user.id}`)
            .then((response) => {
                setSelectedUser(response.data.user);
                setIsEditModalOpen(true);
            })
            .catch((error) => {
                setIsProcessing(false);
                const errorMessage = error.response?.data?.message || "An error occurred.";
                Swal.fire("Error!", errorMessage, "error");
            });
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (userId) => {
        setSelectedUserId(userId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedUserId(null);
        setIsDeleteModalOpen(false);
    };

    const handleApproveSelected = (ids) => {
        setSelectedIds(ids);
        setIsApproveModalOpen(true);
    };

    const confirmApproveSelected = () => {
        setIsProcessing(true);

        axios
            .post(route('admin.user.bulk-approve'), { ids: selectedIds })
            .then(() => {
                setIsProcessing(false);
                setIsApproveModalOpen(false);

                Swal.fire(
                    t("Sukses"),
                    "Akun Mahasiswa berhasil diaktifkan",
                    "success"
                );

                setRefetch(prev => !prev);
            })
            .catch((error) => {
                setIsProcessing(false);
                const errorMessage = getErrorMessage(error, t, i18n.language);

                Swal.fire(
                    t("global.swalError", "Error!"),
                    errorMessage,
                    "error"
                );
            });
    };


    const handleDelete = () => {
        setIsProcessing(true);
        axios
            .delete(`/admin/user/${selectedUserId}`)
            .then(() => {
                setIsProcessing(false);
                setIsDeleteModalOpen(false);
                Swal.fire(
                    t("Deleted!"),
                    t("Pengguna berhasil dihapus"),
                    "success"
                );
                setRefetch((prev) => !prev);
            })
            .catch((error) => {
                setIsProcessing(false);
                const errorMessage = getErrorMessage(error, t, i18n.language);

                Swal.fire(
                    t("global.swalError", "Error!"),
                    errorMessage,
                    "error"
                );
            });
    };

    const handleDeleteSelected = (ids) => {
        setSelectedIds(ids);
        setIsDeleteSelectedModalOpen(true);
    };

    const confirmDeleteSelected = () => {
        setIsProcessing(true);
        axios
            .post(route('admin.user.bulk-delete'), { ids: selectedIds })
            .then(() => {
                setIsProcessing(false);
                setIsDeleteSelectedModalOpen(false);
                Swal.fire("Berhasil!", "Data terpilih berhasil dihapus", "success");
                setRefetch((prev) => !prev);
            })
            .catch((error) => {
                setIsProcessing(false);
                const errorMessage = getErrorMessage(error, t, i18n.language);
                Swal.fire("Error!", errorMessage, "error");
            });
    };

    const handleSearch = (query) => {
        setSearch(query);
        if (query !== search) {
            setCurrentPage(1);
        }
    };

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get("/admin/user/data", {
                params: {
                    page: currentPage,
                    search: search,
                },
            })
            .then((response) => {
                setData(response.data.data);
                setTotalPages(response.data.last_page);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, search, refetch]);

    const toolbarActions = [
        {
            label: 'Approve',
            icon: <CheckBadgeIcon className="w-5 h-5" />,
            action: handleApproveSelected,
            className: 'bg-blue-600 hover:bg-blue-700 text-white',
        },
    ];


    const columns = [
        {
            header: t("global.name"),
            accessor: (row) =>
                <div className="flex items-center gap-4">
                    <Avatar imagePath={row.photo_profile} name={row.name} className="inline-block relative object-cover object-center !rounded-full w-12 h-12" />
                    <div>
                        <h6 className="text-slate-800 font-semibold">
                            {row.name || "-"}
                        </h6>
                        <p className="inline-block rounded bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-semibold">
                            {row.roles && row.roles.length > 0 ? row.roles[0].name : "-"}
                        </p>
                    </div>
                </div>
            ,
        },
        { header: t("global.email"), accessor: (row) => row.email || "-", className: "font-semibold" },
        { header: t("global.phone"), accessor: (row) => row.phone || "-" },
        {
            header: t("global.country"),
            accessor: (row) => (
                <span className="flex items-center gap-2">
                    {row.country && (
                        <img
                            src={getCountryFlagUrl(row.country)}
                            alt={row.country}
                            className="inline-block w-5 h-4 object-cover rounded-sm"
                        />
                    )}
                    {getCountryName(row.country)}
                </span>
            )
        },
        { header: t("global.state"), accessor: (row) => getStateName(row.country, row.state), className: "font-semibold text-center" },
        { header: t("global.city"), accessor: (row) => row.city || "-", className: "font-semibold text-center" },
        { header: t("global.address"), accessor: (row) => row.address || "-" },
        {
            header: "Status Akun",
            accessor: (row) => {
                const active = Boolean(row.is_approved);

                return (
                    <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {active ? "Approved" : "Belum Aktif"}
                    </div>
                );
            }
        },

        {
            header: t("global.actions"),
            accessor: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => openEditModal(row)}
                        className="inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:bg-yellow-700"
                    >
                        <PencilIcon className="w-5 h-5 me-2 rounded-full bg-yellow-500 p-1 text-white" /> <span>{t("global.edit", "Edit")}</span>
                    </button>
                    <DangerButton onClick={() => openDeleteModal(row.id)}>
                        <TrashIcon className="w-5 h-5 me-2 rounded-full bg-red-400 p-1 text-white" /> <span>{t("global.delete", "Hapus")}</span>
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
                onSearch={handleSearch}
                onPageChange={(page) => setCurrentPage(page)}
                onAdd={() => setIsModalOpen(true)}
                addType="modal"
                addButtonText={t("global.user", "User")}
                AddModalContent={CreateUserModal}
                selectable={true}
                onDeleteSelected={handleDeleteSelected}
                toolbarActions={toolbarActions}
                isProcessing={isLoading}
            />

            <CreateUserModal isOpen={isModalOpen} onClose={toggleModal} setRefetch={setRefetch} />

            <EditModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                user={selectedUser}
                setRefetch={setRefetch}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
                title={t("user.deleteTitle", "Delete User")}
                description={t("user.deleteDescription", "Are you sure you want to delete this user? This action cannot be undone.")}
                deleteButtonText={t("user.deleteTitle", "Delete User")}
                isProcessing={isProcessing}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteSelectedModalOpen}
                onClose={() => setIsDeleteSelectedModalOpen(false)}
                onDelete={confirmDeleteSelected}
                title={t("user.deleteSelectedTitle", "Delete Selected Users")}
                description={t("user.deleteSelectedDescription", "Are you sure you want to delete the selected users? This action cannot be undone.")}
                deleteButtonText={t("user.deleteSelectedButton", "Delete Selected")}
                isProcessing={isProcessing}
            />

            <ConfirmModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={confirmApproveSelected}
                title="Approve Data"
                description={`Approve ${selectedIds.length} data terpilih?`}
                confirmButtonText="Approve"
                buttonClassName="bg-blue-600 hover:bg-blue-700 text-white"
                icon={
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                        <CheckBadgeIcon className="w-5 h-5" />
                    </div>
                }
                isProcessing={isProcessing}
            />

        </Card>
    );
};

export default UserTable;