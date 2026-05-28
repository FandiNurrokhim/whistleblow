import React from "react";

import { getImageUrl } from "@/Utils/imageHelper";

export default function PreferenceCard({ label, imageUrl, selected, onClick }) {
    const imagePath = imageUrl ? getImageUrl(imageUrl) : null;
    console.log("Image Path:", imagePath);
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
                selected
                    ? "bg-yellow-300 text-black border-transparent"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
            {imageUrl && (
                <img
                    src={getImageUrl(imageUrl)}
                    alt={label}
                    className="w-6 h-6 object-fill bg-white rounded-full"
                />
            )}
            {label}
        </button>
    );
}
