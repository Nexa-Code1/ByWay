import type { ReactNode } from "react";

type OutletHeaderProps = {
    children: ReactNode;
};

function OutletHeader({ children }: OutletHeaderProps) {
    return (
        <h1 className="font-medium text-primary-700 text-lg my-4">
            {children}
        </h1>
    );
}

export default OutletHeader;
