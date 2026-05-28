import '../css/app.css';
import './bootstrap';
import i18n from './i18n';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Inertia } from '@inertiajs/inertia';

const appName = 'Whistleblow';

Inertia.on('before', (event) => {
    if (event.detail) {
        event.detail.headers = event.detail.headers || {};
        event.detail.headers['X-Locale'] = i18n.language;
    }
});
i18n.on('languageChanged', (lng) => {
    console.log('[Inertia] Changed X-Locale:', lng);
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#D9B36A',
    },
});