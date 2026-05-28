import React, { useState } from "react";
import { getImageUrl } from "@/Utils/imageHelper";

const FALLBACK_IMG = "https://placehold.co/800?text=No+Image&font=roboto";

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    style={{ aspectRatio: "1/1" }}
  />
);

const LightboxImage = ({ src, alt = "", className = "", isUseHelper = true }) => {
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const resolvedSrc = isUseHelper ? getImageUrl(imgSrc) : imgSrc;

  const handleError = () => {
    setImgSrc(FALLBACK_IMG);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="relative inline-block">
        {loading && (
          <Skeleton className={`w-full h-full absolute top-0 left-0 ${className}`} />
        )}
        <img
          src={resolvedSrc}
          alt={alt}
          className={`cursor-pointer ${className} ${loading ? "invisible" : ""}`}
          onClick={() => setOpen(true)}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resolvedSrc}
              alt={alt}
              className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
              onError={handleError}
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl font-bold">&times;</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxImage;
