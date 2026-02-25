import type { ReactNode } from "react";

type InfoItemProps = {
    icon: ReactNode;
    children: ReactNode;
};

function InfoItem({ icon, children }: InfoItemProps) {
    return (
        <div className="flex items-center gap-2 min-w-22">
            {icon}
            <span className="text-sm text-gray-800">{children}</span>
        </div>
    );
}

export default InfoItem;
