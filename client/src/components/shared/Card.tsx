import type { ReactNode } from "react";

type CardProps = {
    className?: string;
    children: ReactNode;
};

function Card({ className, children }: CardProps) {
    return (
        <div
            className={`max-w-72 mx-auto p-3 shadow-lg rounded-xl text-center hover:scale-105 transition-transform ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
