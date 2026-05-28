import React, { useState } from "react";
import { getImageUrl } from "@/Utils/imageHelper";

const Avatar = ({
    imagePath,
    name,
    className = "",
}) => {
    const [imgError, setImgError] = useState(false);

    const initials = name
        ? name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "";

    const finalImagePath = getImageUrl(imagePath);

    if (!finalImagePath || imgError) {
        return (
            <div
                className={`w-10 h-10 rounded-full bg-[#a5a6ff] flex items-center justify-center text-white font-bold text-lg ${className}`}
                title={name}
            >
                {initials}
            </div>
        );
    }

    return (
        <div className="relative">
            <img
                className={`w-10 h-10 rounded-full object-cover ${className}`}
                src={finalImagePath}
                alt={name}
                onError={() => setImgError(true)}
            />
            <span className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-[#4ADE80] border-2 border-white dark:border-[#fff] rounded-full"></span>
        </div>
    );
};

export default Avatar;