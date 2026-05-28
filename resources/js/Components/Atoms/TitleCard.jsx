import React from "react";
import Card from "@/Components/Atoms/Card";

const TitleCard = ({
    header,
    description,
    gradient = "bg-[radial-gradient(108.23%_101.56%_at_73.48%_0%,_#DFD0B8_0%,_#675A48_100%)]",
}) => {
    return (
        <Card className={`w-full ${gradient}`}>
            <h1 className="text-lg font-[700] mb-2 text-[white]">
                {header}
            </h1>
            <p className="text-sm text-[#F9FCFF] font-normal">
                {description}
            </p>
        </Card>
    );
};

export default TitleCard;
