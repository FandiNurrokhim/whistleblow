import React from "react";
import { usePage, Link } from "@inertiajs/react";
import {
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    StarIcon,
    ExclamationTriangleIcon,
    HandThumbUpIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Atoms/StatCard";
import Card from "@/Components/Atoms/Card";

const ScoreBadge = ({ score }) => {
    const color =
        score >= 4 ? "bg-green-100 text-green-700" :
        score >= 3 ? "bg-yellow-100 text-yellow-700" :
                     "bg-red-100 text-red-700";
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
            {score}
        </span>
    );
};

const DashboardPage = () => {
    const { topPerformers, averageScore, whistleblowSummary, assessmentStats, trend, currentPeriod } =
        usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard 360°</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Periode: {currentPeriod}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route("assessment.index")}
                            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <ClipboardDocumentListIcon className="w-4 h-4" /> Penilaian
                        </Link>
                        <Link
                            href={route("whistleblow.index")}
                            className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                            <ExclamationTriangleIcon className="w-4 h-4" /> Whistleblow
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Penilaian"
                        value={assessmentStats?.total ?? 0}
                        icon={ClipboardDocumentListIcon}
                    />
                    <StatCard
                        label="Penilaian Selesai"
                        value={assessmentStats?.completed ?? 0}
                        icon={CheckCircleIcon}
                        className="bg-green-50"
                    />
                    <StatCard
                        label="Rata-rata Skor"
                        value={averageScore ?? "–"}
                        icon={StarIcon}
                        className="bg-blue-50"
                    />
                    <StatCard
                        label="Total Bata Diterima"
                        value={whistleblowSummary?.bata ?? 0}
                        icon={ExclamationTriangleIcon}
                        className="bg-red-50"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Performers */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <TrophyIcon className="w-5 h-5 text-yellow-500" />
                            <h2 className="font-semibold text-gray-800">Top Performers — {currentPeriod}</h2>
                        </div>
                        {topPerformers?.length > 0 ? (
                            <ol className="space-y-2">
                                {topPerformers.map((p, i) => (
                                    <li key={i} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-400 w-5">{i + 1}.</span>
                                            <span className="text-sm font-medium text-gray-700">{p.user?.name ?? "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400">{p.total_assessments}x dinilai</span>
                                            <ScoreBadge score={p.avg_score} />
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-6">Belum ada data penilaian selesai.</p>
                        )}
                    </Card>

                    {/* Whistleblow Summary */}
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                            <h2 className="font-semibold text-gray-800">Ringkasan Whistleblow — {currentPeriod}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-6 gap-1">
                                <span className="text-3xl font-bold text-red-600">{whistleblowSummary?.bata ?? 0}</span>
                                <span className="text-sm text-red-500 font-medium">🧱 Bata Dikirim</span>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-6 gap-1">
                                <span className="text-3xl font-bold text-green-600">{whistleblowSummary?.cendol ?? 0}</span>
                                <span className="text-sm text-green-500 font-medium">🍹 Cendol Dikirim</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Trend Chart (data only) */}
                {trend?.length > 0 && (
                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <StarIcon className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-gray-800">Tren Skor Penilaian</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b text-gray-500 text-xs uppercase">
                                        <th className="py-2 pr-4">Periode</th>
                                        <th className="py-2 pr-4 text-center">Jumlah Penilaian</th>
                                        <th className="py-2 text-center">Rata-rata Skor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trend.map((t, i) => (
                                        <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-2 pr-4 font-medium">{t.period}</td>
                                            <td className="py-2 pr-4 text-center text-gray-600">{t.total}</td>
                                            <td className="py-2 text-center">
                                                <ScoreBadge score={parseFloat(t.avg_score).toFixed(2)} />
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

export default DashboardPage;
