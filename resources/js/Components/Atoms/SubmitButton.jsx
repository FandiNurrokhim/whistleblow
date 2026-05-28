import React from "react";
import { Spinner } from "@material-tailwind/react";

const SubmitButton = ({ isLoading, children }) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60"
        >
            {isLoading && <Spinner className="h-4 w-4 animate-spin" />} {/* Tambahkan animate-spin */}
            {children}
        </button>
    );
};

export default SubmitButton;