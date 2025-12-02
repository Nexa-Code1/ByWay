import { Button } from "antd";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type SectionLayoutProps = {
    title: string;
    className?: string;
    cols?: string;
    linkPath?: string;
    children: ReactNode;
};

function SectionLayout({
    title,
    className,
    cols = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    children,
    linkPath,
}: SectionLayoutProps) {
    const navigate = useNavigate();

    return (
        <section className={`mb-20 ${className}`}>
            <header className="flex items-center justify-between">
                <h2 className="font-bold text-xl mb-6 text-gray-800 text-center sm:text-start">
                    {title}
                </h2>
                {linkPath && (
                    <Button
                        type="text"
                        onClick={() => navigate(linkPath)}
                        className="text-primary-700! font-bold! hover:bg-transparent! hover:scale-105"
                    >
                        See all
                    </Button>
                )}
            </header>
            <div className={`grid grid-cols-1 ${cols} gap-8`}>{children}</div>
        </section>
    );
}

export default SectionLayout;
