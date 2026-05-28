function parseDate(value) {
    if (!value) return null;

    const d = new Date(value);
    if (isNaN(d.getTime())) return null;

    return d;
}

/* =========================
   FULL DATETIME (ID)
========================= */

export function formatDateTimeId(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* =========================
   DATE ONLY (ID)
========================= */

export function formatDateOnly(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

/* =========================
   SHORT DATE
========================= */

export function formatShortDate(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleDateString("id-ID");
}

/* =========================
   TIME ONLY
========================= */

export function formatTime(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* =========================
   BADGE FORMAT
========================= */

export function formatBadgeDate(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* =========================
   MONTH YEAR
========================= */

export function formatMonthYear(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
    });
}

/* =========================
   DAY + DATE
========================= */

export function formatDayDate(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    return d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

/* =========================
   RELATIVE TIME
========================= */

export function formatRelative(value, fallback = "-") {
    const d = parseDate(value);
    if (!d) return fallback;

    const now = new Date();
    const diff = Math.floor((now - d) / 1000);

    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;

    return formatDateOnly(d);
}

/* =========================
   DIFF HELPERS
========================= */

export function diffDays(from, to = new Date()) {
    const a = parseDate(from);
    const b = parseDate(to);
    if (!a || !b) return null;

    return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

export function diffMinutes(from, to = new Date()) {
    const a = parseDate(from);
    const b = parseDate(to);
    if (!a || !b) return null;

    return Math.floor((b - a) / (1000 * 60));
}

/* =========================
   FILENAME FORMAT
========================= */

export function formatForFilename(value = new Date()) {
    const d = parseDate(value);
    if (!d) return "";

    const pad = (n) => String(n).padStart(2, "0");

    return (
        d.getFullYear() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        "_" +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds())
    );
}
