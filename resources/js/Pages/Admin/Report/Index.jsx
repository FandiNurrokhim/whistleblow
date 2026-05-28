import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    StarIcon,
    ExclamationTriangleIcon,
    HandThumbUpIcon,
    TrophyIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Atoms/StatCard";
import Card from "@/Components/Atoms/Card";
import Avatar from "@/Components/Molecules/Avatar";

const ScoreBar = ({ score, max = 5 }) => {
    const pct = Math.min((score / max) * 100, 100);
    const color =
        score >= 4 ? "bg-green-500" :
        score >= 3 ? "bg-yellow-400" :
                     "bg-red-400";
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-semibold text-gray-700 w-8 text-right">{score}</span>
        </div>
    );
};

const ScoreBadge = ({ score }) => {
    const color =
        score >= 4 ? "bg-green-100 text-green-700" :
        score >= 3 ? "bg-yellow-100 text-yellow-700" :
                     "bg-red-100 text-red-700";
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}>
            {score ?? "-"}
        </span>
    );
};

const WbBadge = ({ count, type }) => {
    if (!count) return <span className="text-gray-400 text-xs">–</span>;
    const style = type === "bata"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700";
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}>
            {type === "bata" ? "🧱" : "🍹"} {count}
        </span>
    );
};

const ReportPage = () => {
    const { period, periodOptions, overallStats, userScores, assessorActivity } = usePage().props;
    const [selectedPeriod, setSelectedPeriod] = useState(period);

    const handlePeriodChange = (e) => {
        const val = e.target.value;
        setSelectedPeriod(val);
        router.get(route("admin.report.index"), { period: val }, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Laporan 360°</h1>
                        <nav className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                            <Link href={route("admin.dashboard.index")} className="hover:text-blue-600">Dashboard</Link>
                            <span>/</span>
                            <span>Laporan</span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600">Periode:</label>
                        {periodOptions.length > 0 ? (
                            <select
                                value={selectedPeriod}
                                onChange={handlePeriodChange}
                                className="rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {periodOptions.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="month"
                                value={selectedPeriod}
                                onChange={handlePeriodChange}
                                className="rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard label="Total Penilaian"  value={overallStats.total_assessments} icon={ClipboardDocumentListIcon} />
                    <StatCard label="Selesai"           value={overallStats.completed}         icon={CheckCircleIcon}          className="bg-green-50" />
                    <StatCard label="Draft"             value={overallStats.draft}             icon={ClipboardDocumentListIcon} className="bg-yellow-50" />
                    <StatCard label="Rata-rata Skor"    value={overallStats.avg_score ?? "–"}  icon={StarIcon}                 className="bg-blue-50" />
                    <StatCard label="Total Bata"        value={overallStats.bata_total}        icon={ExclamationTriangleIcon}  className="bg-red-50" />
                    <StatCard label="Total Cendol"      value={overallStats.cendol_total}      icon={HandThumbUpIcon}          className="bg-emerald-50" />
                </div>

                {/* User Score Table */}
                <Card>
                    <div className="flex items-center gap-2 mb-4">
                        <TrophyIcon className="w-5 h-5 text-yellow-500" />
                        <h2 className="font-semibold text-gray-800">Peringkat Penilaian — {period}</h2>
                    </div>

                    {userScores.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                                        <th className="py-3 px-3 w-10">#</th>
                                        <th className="py-3 px-3">Karyawan</th>
                                        <th className="py-3 px-3 text-center">Rata-rata Skor</th>
                                        <th className="py-3 px-3 text-center">Total Dinilai</th>
                                        <th className="py-3 px-3 text-center">Oleh Manajer</th>
                                        <th className="py-3 px-3 text-center">Oleh Rekan</th>
                                        <th className="py-3 px-3 text-center">Bata Diterima</th>
                                        <th className="py-3 px-3 text-center">Cendol Diterima</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userScores.map((row) => (
                                        <tr key={row.user?.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-3">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                                                    ${row.rank === 1 ? "bg-yellow-400 text-white" :
                                                      row.rank === 2 ? "bg-gray-300 text-gray-700" :
                                                      row.rank === 3 ? "bg-orange-300 text-white" :
                                                      "bg-gray-100 text-gray-500"}`}>
                                                    {row.rank}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        imagePath={row.user?.photo_profile}
                                                        name={row.user?.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800">{row.user?.name ?? "-"}</p>
                                                        <p className="text-xs text-gray-400">{row.user?.email ?? ""}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3">
                                                <div className="min-w-[100px]">
                                                    <ScoreBar score={row.avg_score} />
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-center font-medium">{row.total_assessments}</td>
                                            <td className="py-3 px-3 text-center text-gray-500">{row.manager_assessment_count}</td>
                                            <td className="py-3 px-3 text-center text-gray-500">{row.peer_assessment_count}</td>
                                            <td className="py-3 px-3 text-center">
                                                <WbBadge count={row.bata_received} type="bata" />
                                            </td>
                                            <td className="py-3 px-3 text-center">
                                                <WbBadge count={row.cendol_received} type="cendol" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 text-center py-10">
                            Belum ada data penilaian selesai untuk periode <strong>{period}</strong>.
                        </p>
                    )}
                </Card>

                {/* Assessor Activity */}
                {assessorActivity.length > 0 && (
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <UserGroupIcon className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-gray-800">Aktivitas Penilai — {period}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                                        <th className="py-3 px-3">Penilai</th>
                                        <th className="py-3 px-3 text-center">Total Penilaian Dibuat</th>
                                        <th className="py-3 px-3 text-center">Rata-rata Skor yang Diberikan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assessorActivity.map((row, i) => (
                                        <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-3 px-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        imagePath={row.user?.photo_profile}
                                                        name={row.user?.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <p className="font-medium text-gray-800">{row.user?.name ?? "-"}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-center font-medium">{row.total_given}</td>
                                            <td className="py-3 px-3 text-center">
                                                <ScoreBadge score={row.avg_given_score} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

            </div>
        </AuthenticatedLayout>
    );
};

export default ReportPage;
