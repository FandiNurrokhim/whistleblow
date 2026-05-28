import React from "react";

const Input = ({ type = "text", className, ...props }) => {
    return (
        <input
            type={type}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${className}`}
            {...props}
        />
    );
};

export default Input;
