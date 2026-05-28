import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";

const StatCard = ({
  label = "Total Data",
  value = 401,
  icon: Icon = CubeIcon,
}) => {
  return (
    <div className="relative bg-white rounded-xl shadow p-6 w-full overflow-hidden">
      {/* Icon Kecil */}
      <div className="w-10 h-10 flex items-center justify-center bg-[#E7E3DE] rounded-md">
        <Icon size={20} className="text-[#8B7E6B]" />
      </div>

      {/* Label dan Value */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-black">{value}</p>
      </div>

      {/* Icon Dekorasi Besar */}
      <Icon
        size={140}
        className="absolute right-0 bottom-[-20px] text-gray-200 opacity-40 pointer-events-none"
      />
    </div>
  );
};

export default StatCard;
