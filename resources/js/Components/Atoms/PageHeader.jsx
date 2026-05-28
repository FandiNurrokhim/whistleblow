import React from "react";

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    );
};


export default PageHeader;