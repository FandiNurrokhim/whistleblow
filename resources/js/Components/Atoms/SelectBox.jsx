import React from "react";

export default function SelectBox({ label, options = [], value, onChange, placeholder, className = "", ...props }) {
    return (
        <>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <select
                className={`w-full border border-gray-300 rounded px-3 py-2 text-sm ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </>
    );
}