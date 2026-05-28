/**
 * Ambil pesan error berdasarkan bahasa aktif.
 * Jika error adalah JSON string, maka akan diparse dan pilih berdasarkan bahasa.
 *
 * @param {string} error - Error dari Inertia (mungkin string biasa atau JSON string)
 * @param {string} lang - Bahasa aktif (contoh: 'id' atau 'en')
 * @returns {string} Pesan error sesuai bahasa atau default
 */
export function getInertiaErrorMessage(error, lang = 'id') {
    if (!error) return '';

    try {
        const parsed = JSON.parse(error);
        return parsed[lang] || parsed.id || parsed.en || error;
    } catch (e) {
        return error;
    }
}


export const getErrorMessage = (error, t, locale = "id") =>
    typeof error?.response?.data?.message === "object"
        ? error.response.data.message[t("global.locale", locale)] || error.response.data.message.id || error.response.data.message.en || t("global.anErrorOccurred", "An error occurred.")
        : error?.response?.data?.message || t("global.anErrorOccurred", "An error occurred.");