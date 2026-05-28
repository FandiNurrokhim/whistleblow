import React from "react";

const Textarea = ({ className, ...props }) => {
    return (
        <textarea
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${className}`}
            {...props}
        />
    );
};

export default Textarea;
