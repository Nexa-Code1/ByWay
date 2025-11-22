import type { ReactNode } from "react";

type SectionContainerProps = {
    className?: string;
    children: ReactNode;
};

function SectionContainer({ className, children }: SectionContainerProps) {
    return (
        <div
            className={`container max-w-6xl mx-auto p-2 sm:p-6 my-16 ${className}`}
        >
            {children}
        </div>
    );
}

export default SectionContainer;
