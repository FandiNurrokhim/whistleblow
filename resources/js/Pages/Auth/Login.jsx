import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import ApplicationLogo from "@/Components/ApplicationLogo";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";

const Feature = ({ icon, title, desc }) => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className={`${icon} text-blue-200 text-sm`} />
        </div>
        <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-blue-200 mt-0.5 leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default function Login({ status }) {
    const { t } = useTranslation();
    const [showPass, setShowPass] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email:    "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onError: (errs) => {
                const first = Object.values(errs)[0];
                Swal.fire({ icon: "error", title: "Gagal Masuk", text: first });
                reset("password");
            },
        });
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Masuk — Sistem 360°" />

            {/* ── Left Panel (Branding) ─────────────────────────── */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1E3A8A] flex-col justify-between p-12">
                <div className="flex items-center gap-3">
                    <ApplicationLogo className="w-10 h-10 text-white" />
                    <span className="text-white font-bold text-lg">360° Assessment</span>
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Sistem Penilaian<br />
                            <span className="text-blue-300">360° & Whistleblowing</span>
                        </h1>
                        <p className="text-blue-200 mt-4 text-sm leading-relaxed max-w-xs">
                            Platform manajemen kinerja tim yang transparan, adil, dan aman
                            untuk mendorong budaya kerja yang lebih baik.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Feature
                            icon="fa-solid fa-clipboard-check"
                            title="Penilaian 360°"
                            desc="Nilai rekan dan atasan secara objektif. Manajer dan staff memiliki bobot penilaian berbeda."
                        />
                        <Feature
                            icon="fa-solid fa-flag"
                            title="Whistleblowing Aman"
                            desc="Sampaikan laporan bata atau apresiasi cendol dengan kuota terkontrol per periode."
                        />
                        <Feature
                            icon="fa-solid fa-chart-bar"
                            title="Dashboard & Laporan"
                            desc="Pantau kinerja tim, ranking, dan tren penilaian secara real-time."
                        />
                    </div>
                </div>

                <p className="text-blue-300 text-xs">
                    🔒 Data terenkripsi &amp; laporan dijaga kerahasiaannya
                </p>
            </div>

            {/* ── Right Panel (Form) ────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
                <div className="w-full max-w-sm space-y-8">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 justify-center">
                        <ApplicationLogo className="w-8 h-8 text-[#1E3A8A]" />
                        <span className="font-bold text-[#1E3A8A]">360° Assessment</span>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Selamat Datang</h2>
                        <p className="text-sm text-gray-500 mt-1">Masuk untuk melanjutkan ke sistem.</p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                            <i className="fas fa-check-circle text-green-500 mt-0.5" />
                            <p className="text-sm text-green-700">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel value="Email" htmlFor="email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="nama@perusahaan.com"
                                autoComplete="username"
                                autoFocus
                                required
                            />
                            <InputError message={errors.email} className="mt-1.5" />
                        </div>

                        <div>
                            <InputLabel value="Kata Sandi" htmlFor="password" />
                            <div className="relative mt-1">
                                <TextInput
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="block w-full pr-10"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPass((p) => !p)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} text-sm`} />
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={data.remember}
                                    onCheckedChange={(v) => setData("remember", v)}
                                />
                                <span className="text-sm text-gray-600">Ingat saya</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2.5 rounded-lg bg-[#1E3A8A] text-white font-medium text-sm hover:bg-[#1E40AF] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {processing && (
                                <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            )}
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-xs text-blue-700 font-medium">Tidak punya akun?</p>
                        <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
                            Akun dibuat oleh administrator. Hubungi tim HR atau admin sistem Anda untuk mendapatkan akses.
                        </p>
                    </div>

                    <p className="text-center text-xs text-gray-400">
                        🔒 Koneksi aman · Data terlindungi
                    </p>
                </div>
            </div>
        </div>
    );
}
