import React, { useState, useEffect } from 'react';
import LoginGoogleButton from '@/Components/Atoms/LoginGoogleButton';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { Head, useForm } from '@inertiajs/react';
import { Spinner } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

export default function Login({ status }) {
    const { t } = useTranslation();

    const [mode, setMode] = useState("login");
    const [studyPrograms, setStudyPrograms] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nim: '',
        study_program_id: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    });

    useEffect(() => {
        fetch("/study-program/select-data")
            .then(res => res.json())
            .then(result => {
                setStudyPrograms(result.data?.studyPrograms || []);
            })
            .catch(() => {
                Swal.fire("Error!", "Gagal mengambil data prodi", "error");
            });
    }, []);

    const studyProgramOptions = studyPrograms.map(sp => ({
        value: sp.id,
        label: `${sp.code} - ${sp.name}`,
    }));

    const submit = (e) => {
        e.preventDefault();

        const routeName = mode === "login" ? "login" : "register";

        post(route(routeName), {
            onSuccess: (page) => {
                Swal.fire({
                    icon: "success",
                    title: "Sukses",
                    text: page.props?.status ?? "Berhasil login",
                });

                reset("password", "password_confirmation");
            },

            onError: (errors) => {
                const firstError = Object.values(errors)[0];

                Swal.fire({
                    icon: "error",
                    title: t("global.swalError"),
                    text: firstError || t("global.failedProcess"),
                });
            },

            onFinish: () => {
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-green-600 text-lg">✓</div>
                        <div>
                            <p className="text-sm font-semibold text-green-800">
                                {t("global.success")}
                            </p>
                            <p className="text-sm text-green-700 mt-1">
                                {status}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <form className="space-y-6 py-10 px-6 pb-6" onSubmit={submit}>

                <h3 className="text-xl font-medium text-gray-900">
                    {mode === "login"
                        ? t('global.loginTitle')
                        : t('global.createAccountTitle')}
                </h3>

                {mode === "register" && (
                    <>
                        <div>
                            <InputLabel htmlFor="nim" value="NIM" />
                            <TextInput
                                id="nim"
                                value={data.nim}
                                onChange={e => setData('nim', e.target.value)}
                                className="w-full"
                                required
                            />
                            <InputError message={errors.nim} />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value={t('global.name')} />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <InputLabel value="Program Studi" />
                            <Select
                                options={studyProgramOptions}
                                value={studyProgramOptions.find(o => o.value === data.study_program_id) || null}
                                onChange={(opt) =>
                                    setData("study_program_id", opt?.value || "")
                                }
                                placeholder="Pilih Prodi"
                                isClearable
                            />
                            <InputError message={errors.study_program_id} />
                        </div>
                    </>
                )}

                {/* ================= COMMON ================= */}

                <div>
                    <InputLabel htmlFor="email" value={t('global.email')} />
                    <TextInput
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full"
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('global.password')} />
                    <TextInput
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="w-full"
                        required
                    />
                    <InputError message={errors.password} />
                </div>

                {mode === "register" && (
                    <div>
                        <InputLabel value={t('global.confirmPassword')} />
                        <TextInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={e =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="w-full"
                            required
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                )}

                <div className="flex items-center">
                    <Checkbox
                        checked={data.remember}
                        onChange={e => setData('remember', e.target.checked)}
                    />
                    <span className="ml-2 text-sm">
                        {t('global.rememberMe')}
                    </span>
                </div>

                {/* ================= BUTTON ================= */}

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-2 bg-[#0E1C2D] text-white rounded-lg flex justify-center items-center gap-2 hover:text-[#D9B36A]"
                >
                    {processing && <Spinner className="h-4 w-4" />}
                    {processing
                        ? t('global.processing')
                        : mode === "login"
                            ? t('global.login')
                            : t('global.register')}
                </button>

                {/* <LoginGoogleButton /> */}

                {/* ================= SWITCH MODE ================= */}

                <div className="text-center text-sm text-gray-500">
                    {mode === "login" ? (
                        <>
                            {t('global.notRegistered')}?{" "}
                            <button
                                type="button"
                                className="text-blue-700"
                                onClick={() => setMode("register")}
                            >
                                {t('global.createAccount')}
                            </button>
                        </>
                    ) : (
                        <>
                            {t('global.alreadyHaveAccount')}?{" "}
                            <button
                                type="button"
                                className="text-blue-700"
                                onClick={() => setMode("login")}
                            >
                                {t('global.login')}
                            </button>
                        </>
                    )}
                </div>

            </form>
        </GuestLayout>
    );
}
