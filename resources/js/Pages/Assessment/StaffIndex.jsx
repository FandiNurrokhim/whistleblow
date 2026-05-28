import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Avatar from "@/Components/Molecules/Avatar";
import AssessModal from "./_partials/AssessModal";

const SCORE_COLOR = (s) =>
    s >= 4 ? "text-green-600" : s >= 3 ? "text-yellow-500" : "text-red-500";

const ScoreBar = ({ score, max = 5 }) => {
    const pct   = Math.round((score / max) * 100);
    const color  = score >= 4 ? "bg-green-500" : score >= 3 ? "bg-yellow-400" : "bg-red-400";
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className={`text-sm font-bold w-8 text-right ${SCORE_COLOR(score)}`}>{score}</span>
        </div>
    );
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

const StaffAssessmentPage = () => {
    const { period: initPeriod, criteriaList, targets: initTargets, myScores: initScores } = usePage().props;

    const [tab, setTab]             = useState("assess");
    const [period, setPeriod]       = useState(initPeriod);
    const [targets, setTargets]     = useState(initTargets);
    const [myScores, setMyScores]   = useState(initScores);
    const [isLoading, setIsLoading] = useState(false);
    const [assessModal, setAssessModal] = useState({ open: false, user: null });

    const loadPeriod = (newPeriod) => {
        setPeriod(newPeriod);
        setIsLoading(true);
        Promise.all([
            axios.get(route("assessment.targets"),  { params: { period: newPeriod } }),
            axios.get(route("assessment.my-scores"), { params: { period: newPeriod } }),
        ]).then(([t, s]) => {
            setTargets(t.data.data);
            setMyScores(s.data.data);
        }).finally(() => setIsLoading(false));
    };

    const onAssessSuccess = () => {
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Penilaian berhasil disimpan.", timer: 1500, showConfirmButton: false });
        setAssessModal({ open: false, user: null });
        loadPeriod(period);
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Penilaian 360°</h1>
                        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                            Nilai rekan satu tim secara jujur dan profesional untuk pertumbuhan bersama.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 font-medium">Periode:</label>
                        <input
                            type="month"
                            value={period}
                            max={new Date().toISOString().slice(0, 7)}
                            onChange={(e) => loadPeriod(e.target.value)}
                            className="rounded-md border-gray-300 text-sm shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex gap-1">
                        <Tab active={tab === "assess"} onClick={() => setTab("assess")}>
                            Nilai Rekan
                            <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-blue-100 text-blue-700">
                                {targets.filter((t) => !t.assessed).length}
                            </span>
                        </Tab>
                        <Tab active={tab === "scores"} onClick={() => setTab("scores")}>
                            Skor Saya
                        </Tab>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Tab: Nilai Rekan */}
                {!isLoading && tab === "assess" && (
                    <div>
                        {targets.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <p className="text-gray-400 text-sm">Belum ada rekan yang dapat dinilai untuk periode ini.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {targets.map(({ user, assessed, assessment_id }) => (
                                    <div
                                        key={user.id}
                                        className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-4 transition-all ${
                                            assessed ? "opacity-75 border-gray-100" : "border-gray-200 hover:shadow-md"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                imagePath={user.photo_profile}
                                                name={user.name}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        {assessed ? (
                                            <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                                                <i className="fas fa-check-circle" />
                                                <span>Sudah Dinilai</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setAssessModal({ open: true, user })}
                                                className="w-full py-2 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#1E40AF] transition-colors"
                                            >
                                                Nilai Sekarang
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Skor Saya */}
                {!isLoading && tab === "scores" && (
                    <div className="space-y-4">
                        {myScores.total_assessments === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <p className="text-gray-400 text-sm">Belum ada penilaian yang diterima untuk periode ini.</p>
                            </div>
                        ) : (
                            <>
                                {/* Summary card */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Rata-rata Skor</p>
                                            <p className={`text-5xl font-bold mt-1 ${SCORE_COLOR(myScores.avg_score)}`}>
                                                {myScores.avg_score}
                                                <span className="text-lg text-gray-400 font-normal"> / 5</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-6 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-800">{myScores.total_assessments}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Total Penilai</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-800">{myScores.manager_count}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Dari Manajer</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-800">{myScores.peer_count}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Dari Rekan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Per-criteria breakdown */}
                                {myScores.by_criteria.length > 0 && (
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h3 className="font-semibold text-gray-700 mb-4 text-sm">Skor per Kriteria</h3>
                                        <div className="space-y-4">
                                            {myScores.by_criteria.map((c) => (
                                                <div key={c.name}>
                                                    <div className="flex justify-between mb-1.5">
                                                        <span className="text-sm text-gray-600">{c.name}</span>
                                                    </div>
                                                    <ScoreBar score={c.score} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-gray-400 text-center">
                                    🔒 Identitas penilai dijaga kerahasiaannya untuk menjaga objektivitas penilaian.
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>

            <AssessModal
                isOpen={assessModal.open}
                user={assessModal.user}
                period={period}
                criteriaList={criteriaList}
                onClose={() => setAssessModal({ open: false, user: null })}
                onSuccess={onAssessSuccess}
            />
        </AuthenticatedLayout>
    );
};

export default StaffAssessmentPage;
