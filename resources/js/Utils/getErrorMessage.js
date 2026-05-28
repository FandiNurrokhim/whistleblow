/**
 * Deteksi apakah errors dari Inertia onError adalah validasi (field-specific)
 * atau kesalahan server (ada key 'message'/'error' atau bukan object).
 *
 * @param {object|string} errors
 * @returns {'validation'|'server'}
 */
export function getInertiaErrorType(errors) {
    if (typeof errors !== 'object' || errors === null || Array.isArray(errors)) {
        return 'server';
    }
    // Jika ada key 'message' atau 'error' → kemungkinan error server / generic
    if ('message' in errors || 'error' in errors) {
        return 'server';
    }
    return 'validation';
}

/**
 * Ambil pesan error dari Inertia.
 * Mendukung:
 * - Object validasi Laravel: { field: 'message', ... }
 * - Object server error: { message: 'Server Error' }
 * - JSON string multilingual: '{"id":"...", "en":"..."}'
 * - String biasa
 *
 * @param {object|string} error - Error dari Inertia onError callback atau string
 * @param {string} lang - Bahasa aktif (contoh: 'id' atau 'en')
 * @returns {string} Pesan error yang siap ditampilkan
 */
export function getInertiaErrorMessage(error, lang = 'id') {
    if (!error) return '';

    if (typeof error === 'object' && !Array.isArray(error)) {
        // Server/generic error dengan key 'message' atau 'error'
        if (error.message) return error.message;
        if (error.error)   return error.error;

        // Validasi Laravel: { field: 'message', ... }
        const messages = Object.values(error).flat().filter(Boolean);
        return messages.length > 0 ? messages.join(' ') : 'Terdapat inputan yang belum sesuai.';
    }

    // String — coba parse sebagai JSON multilingual
    if (typeof error === 'string') {
        try {
            const parsed = JSON.parse(error);
            return parsed[lang] || parsed.id || parsed.en || error;
        } catch {
            return error;
        }
    }

    return 'Terjadi kesalahan.';
}

/**
 * Buat konfigurasi Swal.fire() berdasarkan tipe error Inertia.
 * Otomatis membedakan error validasi (icon info) vs error server (icon error).
 *
 * @param {object|string} errors - errors dari Inertia onError callback
 * @param {string} lang - Bahasa aktif
 * @returns {{ icon: string, title: string, text: string }}
 */
export function getInertiaErrorSwal(errors, lang = 'id') {
    const type    = getInertiaErrorType(errors);
    const message = getInertiaErrorMessage(errors, lang);

    if (type === 'validation') {
        return {
            icon:  'info',
            title: 'Perhatian',
            text:  message || 'Terdapat inputan yang belum sesuai, silakan periksa kembali.',
        };
    }

    return {
        icon:  'error',
        title: 'Kesalahan',
        text:  message || 'Terjadi kesalahan pada server, silakan coba lagi.',
    };
}


export const getErrorMessage = (error, t, locale = "id") =>
    typeof error?.response?.data?.message === "object"
        ? error.response.data.message[t("global.locale", locale)] || error.response.data.message.id || error.response.data.message.en || t("global.anErrorOccurred", "An error occurred.")
        : error?.response?.data?.message || t("global.anErrorOccurred", "An error occurred.");