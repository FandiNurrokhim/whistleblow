import { useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import Card from "../Atoms/Card";

export default function DateFilterExport({
    onApply,
    exportUrl,
    defaultFilters = {
        date_from: "",
        date_to: "",
    },
}) {
    const [localFilters, setLocalFilters] = useState(defaultFilters);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApply = () => {
        onApply(localFilters);
    };

    const handleReset = () => {
        const resetValue = {
            date_from: "",
            date_to: "",
        };
        setLocalFilters(resetValue);
        onApply(resetValue);
    };

    const handleExport = () => {
        const params = new URLSearchParams(localFilters).toString();
        window.open(`${exportUrl}?${params}`, "_blank");
    };

    return (
        <Card>
            <div className="flex flex-wrap items-end gap-4">

                {/* Date From */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">
                        Tanggal Mulai
                    </label>
                    <Input
                        type="date"
                        name="date_from"
                        value={localFilters.date_from}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#D9B36A] focus:border-[#D9B36A] transition"
                    />
                </div>

                {/* Date To */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">
                        Tanggal Selesai
                    </label>
                    <Input
                        type="date"
                        name="date_to"
                        value={localFilters.date_to}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#D9B36A] focus:border-[#D9B36A] transition"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-auto">

                    <Button
                        onClick={handleApply}
                        className="bg-[#D9B36A] hover:bg-[#c49d4e] text-white px-5 py-2 rounded-lg shadow-sm transition"
                    >
                        Terapkan
                    </Button>

                    <Button
                        onClick={handleReset}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition"
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={handleExport}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
                    >
                        Export
                    </Button>

                </div>
            </div>
        </Card>
    );
}