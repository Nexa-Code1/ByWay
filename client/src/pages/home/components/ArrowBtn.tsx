import type { ButtonHTMLAttributes, ReactNode } from "react";

type ArrowBtnProps = {
    className: string;
    icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ArrowBtn({ className, icon, ...props }: ArrowBtnProps) {
    return (
        <button
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-xl bg-white flex items-center justify-center text-gray-800 cursor-pointer hover:scale-105 transition-all z-10 border border-gray-800 ${className}`}
            {...props}
        >
            {icon}
        </button>
    );
}

export default ArrowBtn;
