import React from "react";
import { useTranslation } from "react-i18next";

const Rating = ({ rating, userReviewCount, detailView = false }) => {
    const { t } = useTranslation();

    const safeRating = Math.max(0, Math.min(rating, 5));
    const fullStars = Math.floor(safeRating);
    const halfStar = safeRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex md:flex-row flex-col md:items-center text-start">
            {/* Bintang */}
            <div className="flex items-center md:justify-center justify-start text-sm md:text-base">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>
                ))}
                {halfStar && (
                    <i className="fas fa-star-half-alt text-yellow-400"></i>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star text-gray-300"></i>
                ))}
            </div>


            {/* Teks rating & jumlah review */}
            {detailView ? (
                <p className="text-xs text-gray-500 mt-1">
                    {safeRating} {t("global.outOf")} 5 ({userReviewCount} {t("global.reviews")})
                </p>
            ) : (
                <p className="text-xs text-gray-500 font-semibold mt-1">
                    {safeRating} ({userReviewCount})
                </p>
            )}
        </div>
    );
};

export default Rating;