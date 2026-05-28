import React from "react";
import {
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
                Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                {generatePageNumbers().map((page, index) => (
                    <Button
                        key={index}
                        className={`${currentPage === page ? "bg-green-500 text-white" : "bg-transparent"
                            }`}
                        size="sm"
                        variant={currentPage === page ? "filled" : "outlined"}
                        onClick={() => typeof page === "number" && setCurrentPage(page)}
                        disabled={page === "..."}
                    >
                        {page}
                    </Button>
                ))}


                <Button
                    className={`${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-800 text-white"
                        }`}
                    variant="filled"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </CardFooter>
    );
};

export default Pagination;
