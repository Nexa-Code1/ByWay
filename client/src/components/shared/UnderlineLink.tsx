import type { ReactNode } from "react";
import { Link } from "react-router";

type UnderlineLinkProps = {
    children: ReactNode;
    to: string;
    className?: string;
};

function UnderlineLink({ children, to, className }: UnderlineLinkProps) {
    return (
        <Link
            to={to}
            className={`underline text-primary-600 font-semibold transition ${className}`}
        >
            {children}
        </Link>
    );
}

export default UnderlineLink;
