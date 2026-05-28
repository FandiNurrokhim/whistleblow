import React from "react";

const Chip = ({ children, className, ...props }) => {
    return (
        <span
            className={`px-3 py-1 rounded-full text-sm shadow-sm ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Chip;
