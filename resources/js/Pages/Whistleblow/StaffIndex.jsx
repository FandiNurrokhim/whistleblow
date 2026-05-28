import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Textarea from "@/Components/Atoms/Textarea";
import Avatar from "@/Components/Molecules/Avatar";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const STATUS_BADGE = {
    pending:  { label: "Menunggu",  color: "bg-yellow-100 text-yellow-700" },
    reviewed: { label: "Ditinjau", color: "bg-blue-100 text-blue-700" },
    resolved: { label: "Selesai",  color: "bg-green-100 text-green-700" },
};

const Tab = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            active
                ? "border-[#1E3A8A] text-[#1E3A8A] bg-white"
                : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
    >
        {children}
    </button>
);

const QuotaBadge = ({ label, value, color }) => (
    <div className={`flex flex-col items-center rounded-xl px-5 py-3 ${color}`}>
        <span className="text-2xl font-bold leading-none">{value}</span>
        <span className="text-xs mt-1 font-medium">{label}</span>
    </div>
);

const StaffWhistleblowPage = () => {
    const { quota, users } = usePage().props;

    const [tab, setTab]           = useState("submit");
    const [reports, setReports]   = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        reported_id:   "",
        type:          "bata",
        reason:        "",
        incident_date: "",
    });

    const userOptions     = users.map((u) => ({ value: u.id, label: u.name }));
    const selectedReported = userOptions.find((o) => o.value == data.reported_id) || null;

    const loadReports = () => {
        setIsLoading(true);
        axios.get(route("whistleblow.my-reports"), { params: { type: typeFilter || undefined } })
            .then(({ data: res }) => setReports(res.data ?? []))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (tab === "history") loadReports();
    }, [tab, typeFilter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("whistleblow.store"), {
            onSuccess: () => {
                Swal.fire({ icon: "success", title: "Laporan Terkirim!", text: "Laporan Anda sudah kami terima.", timer: 1800, showConfirmButton: false });
                reset();
                if (tab === "history") loadReports();
            },
            onError: (errs) => {
                const msg = errs.error ?? getInertiaErrorMessage(errs);
                Swal.fire({ icon: "error", title: "Gagal", text: msg });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Whistleblow</h1>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        Sampaikan laporan dengan jujur. Semua laporan diproses secara profesional.
                    </p>
                </div>

                {/* Quota Cards */}
                <div className="flex gap-3">
                    <QuotaBadge label="🧱 Sisa Bata"   value={quota?.bata_remaining   ?? 0} color="bg-red-50 text-red-700" />
                    <QuotaBadge label="🍹 Sisa Cendol" value={quota?.cendol_remaining ?? 0} color="bg-green-50 text-green-700" />
                    <div className="flex items-center text-xs text-gray-400 ml-2">
                        Periode: <span className="font-medium text-gray-600 ml-1">{quota?.period}</span>
                    </div>
                </div>

                {quota?.bata_remaining === 0 && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                        <i className="fas fa-exclamation-circle" />
                        Kuota bata Anda habis untuk periode ini. Kuota akan direset di periode berikutnya.
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex gap-1">
                        <Tab active={tab === "submit"} onClick={() => setTab("submit")}>Kirim Laporan</Tab>
                        <Tab active={tab === "history"} onClick={() => setTab("history")}>Laporan Saya</Tab>
                    </div>
                </div>

                {/* Tab: Kirim Laporan */}
                {tab === "submit" && (
                    <div className="max-w-xl">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">

                            {/* Tipe */}
                            <div>
                                <InputLabel value="Tipe Laporan" />
                                <div className="mt-2 grid grid-cols-2 gap-3">
                                    {[
                                        { v: "bata",   icon: "🧱", title: "Bata", desc: "Laporkan insiden atau pelanggaran budaya kerja" },
                                        { v: "cendol", icon: "🍹", title: "Cendol", desc: "Apresiasi kontribusi dan budaya kerja positif" },
                                    ].map(({ v, icon, title, desc }) => (
                                        <button
                                            key={v}
                                            type="button"
                                            onClick={() => setData("type", v)}
                                            className={`text-left p-3 rounded-lg border-2 transition-all ${
                                                data.type === v
                                                    ? v === "bata"
                                                        ? "border-red-400 bg-red-50"
                                                        : "border-green-400 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <p className="text-lg leading-none">{icon}</p>
                                            <p className="font-semibold text-gray-800 mt-1 text-sm">{title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                                        </button>
                                    ))}
                                </div>
                                <InputError message={errors.type} className="mt-1" />
                            </div>

                            {/* Orang */}
                            <div>
                                <InputLabel value={data.type === "bata" ? "Orang yang Dilaporkan" : "Orang yang Diapresiasi"} />
                                <Select
                                    options={userOptions}
                                    value={selectedReported}
                                    onChange={(opt) => setData("reported_id", opt ? opt.value : "")}
                                    placeholder="-- Pilih Karyawan --"
                                    isClearable
                                    menuPlacement="auto"
                                    className="mt-1"
                                />
                                <InputError message={errors.reported_id} className="mt-1" />
                            </div>

                            {/* Tanggal */}
                            <div>
                                <InputLabel value="Tanggal Kejadian" />
                                <TextInput
                                    type="date"
                                    value={data.incident_date}
                                    onChange={(e) => setData("incident_date", e.target.value)}
                                    max={new Date().toISOString().split("T")[0]}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.incident_date} className="mt-1" />
                            </div>

                            {/* Alasan */}
                            <div>
                                <InputLabel value={data.type === "bata" ? "Ceritakan Kejadian" : "Ceritakan Kontribusi Positifnya"} />
                                <Textarea
                                    className="mt-1 block"
                                    value={data.reason}
                                    onChange={(e) => setData("reason", e.target.value)}
                                    rows={4}
                                    maxLength={1000}
                                    placeholder={
                                        data.type === "bata"
                                            ? "Jelaskan dengan detail apa yang terjadi, kapan, dan dampaknya..."
                                            : "Jelaskan kontribusi atau perilaku positif yang layak diapresiasi..."
                                    }
                                />
                                <div className="flex justify-between mt-1">
                                    <InputError message={errors.reason} />
                                    <p className="text-xs text-gray-400">{data.reason.length}/1000</p>
                                </div>
                            </div>

                            {/* Trust indicator */}
                            <p className="text-xs text-gray-400">
                                🔒 Laporan Anda aman dan ditangani secara profesional oleh tim HR.
                            </p>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 rounded-lg bg-[#1E3A8A] text-white font-medium text-sm hover:bg-[#1E40AF] transition-colors disabled:opacity-60"
                            >
                                {processing ? "Mengirim..." : "Kirim Laporan"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Tab: Laporan Saya */}
                {tab === "history" && (
                    <div className="space-y-4">
                        {/* Filter */}
                        <div className="flex gap-2">
                            {[["", "Semua"], ["bata", "🧱 Bata"], ["cendol", "🍹 Cendol"]].map(([v, label]) => (
                                <button
                                    key={v}
                                    onClick={() => setTypeFilter(v)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                        typeFilter === v
                                            ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {isLoading && (
                            <div className="flex justify-center py-8">
                                <div className="w-7 h-7 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}

                        {!isLoading && reports.length === 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <p className="text-gray-400 text-sm">Anda belum pernah mengirim laporan.</p>
                            </div>
                        )}

                        {!isLoading && reports.map((report) => {
                            const badge = STATUS_BADGE[report.status] ?? STATUS_BADGE.pending;
                            return (
                                <div key={report.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                imagePath={report.reported?.photo_profile}
                                                name={report.reported?.name}
                                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{report.reported?.name ?? "-"}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {report.type === "bata" ? "🧱 Bata" : "🍹 Cendol"} · {report.incident_date}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">{report.reason}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default StaffWhistleblowPage;
