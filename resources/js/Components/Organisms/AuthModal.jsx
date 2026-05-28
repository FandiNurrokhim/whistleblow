import { useState, useEffect, Fragment } from "react";
import { useForm, Link } from "@inertiajs/react";
import LoginGoogleButton from "@/Components/Atoms/LoginGoogleButton";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TextInput from "@/Components/TextInput";
import Checkbox from '@/Components/Checkbox';
import { Spinner } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }) {
    const [mode, setMode] = useState(defaultMode);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        setMode(defaultMode);
    }, [defaultMode]);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        remember: false,
    });

    // Reset mode to login when modal closed
    const close = () => {
        setMode("login");
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onFinish: () => reset("password"),
            headers: {
                'X-Locale': i18n.language,
            },
        };
        if (mode === "login") {
            post(route("login"), options);
        } else {
            post(route("register"), options);
        }
    };

    return (
        <Transition show={isOpen} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed w-full inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={close}
            >
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    className="w-full sm:max-w-md mx-auto transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                >
                    <Dialog.Panel
                        className="mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full max-w-md"
                    >
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                                onClick={close}
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form className="space-y-6 px-6 pb-6" onSubmit={handleSubmit}>
                            <h3 className="text-xl font-medium text-gray-900">
                                {mode === "login" ? t('global.loginTitle') : t('global.createAccountTitle')}
                            </h3>
                            {mode === "register" && (
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">{t('global.name')}</label>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData("name", e.target.value)}
                                        required
                                        className="w-full"
                                        placeholder={t('global.name')}
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">{t('global.email')}</label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData("email", e.target.value)}
                                    required
                                    className="w-full"
                                    placeholder="Email"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">{t('global.password')}</label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData("password", e.target.value)}
                                    required
                                    className="w-full"
                                    placeholder="Password"
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>
                            {mode === "register" && (
                                <div>
                                    <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-900 block mb-2">{t('global.confirmPassword')}</label>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData("password_confirmation", e.target.value)}
                                        required
                                        className="w-full"
                                        placeholder={t('global.confirmPassword')}
                                    />
                                    {errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>}
                                </div>
                            )}
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-900">{t('global.rememberMe')}</label>
                                </div>
                                {/* {mode === "login" && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-700 hover:underline"
                                    >
                                        {t('global.lostPassword')}?
                                    </Link>
                                )} */}
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 border bg-[#0E1C2D] align-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-[#D9B36A] hover:shadow transition duration-150 flex items-center"
                                disabled={processing}
                            >
                                {processing && (
                                    <span className="mr-2">
                                        <Spinner className="h-4 w-4 animate-spin" />
                                    </span>
                                )}
                                {processing
                                    ? t('global.processing')
                                    : mode === "login"
                                        ? t('global.login')
                                        : t('global.register')}
                            </button>
                            <LoginGoogleButton />
                            <div className="text-sm font-medium text-gray-500 text-center">
                                {mode === "login" ? (
                                    <>
                                        {t('global.notRegistered')}?{" "}
                                        <button
                                            type="button"
                                            className="text-blue-700 hover:underline"
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
                                            className="text-blue-700 hover:underline"
                                            onClick={() => setMode("login")}
                                        >
                                            {t('global.login')}
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}