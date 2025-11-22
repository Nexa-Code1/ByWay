import { Button } from "antd";
import { useNavigate } from "react-router";

type WhatIsCardProps = {
    img: string;
    title: string;
    buttonLabel: string;
    pagePath: string;
};

function WhatIsCard({ img, title, buttonLabel, pagePath }: WhatIsCardProps) {
    const navigate = useNavigate();

    return (
        <div
            className="w-full max-w-md min-h-50 md:min-h-64 bg-red-800 rounded-xl p-4 flex flex-col items-center justify-center gap-4 overflow-hidden shadow-lg"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h3 className="uppercase text-gray-100 font-semibold text-xl">
                {title}
            </h3>
            <Button
                type="default"
                shape="round"
                size="large"
                className="bg-transparent! text-gray-100! p-4! md:p-6! hover:border-orange-100! shadow-md"
                onClick={() => navigate(pagePath)}
            >
                {buttonLabel}
            </Button>
        </div>
    );
}
export default WhatIsCard;
