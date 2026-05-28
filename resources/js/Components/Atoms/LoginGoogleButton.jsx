import React from "react";

import { useTranslation } from "react-i18next";

const LoginGoogleButton = () => {
    const { t } = useTranslation();

    return (
        <a href="/auth/google"
            type="button"
            className="px-4 py-2 border flex align-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
            <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
            />
            <span className="text-slate-700">{t('global.loginWithGoogle')}</span>
        </a>
    );
};

export default LoginGoogleButton;