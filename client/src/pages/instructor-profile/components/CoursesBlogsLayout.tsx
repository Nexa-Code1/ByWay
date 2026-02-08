import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import type { ReactNode } from "react";

type CoursesBlogsLayoutProps = {
    children: ReactNode;
    isLoading: boolean;
    isError: boolean;
    count: number;
    title: string;
};

function CoursesBlogsLayout({
    children,
    isLoading,
    isError,
    count,
    title,
}: CoursesBlogsLayoutProps) {
    return (
        <section className="bg-white flex flex-col justify-center">
            {isLoading ? (
                <Spinner
                    size="default"
                    className="text-primary-700! self-center mt-12!"
                />
            ) : isError ? (
                <Error />
            ) : (
                <>
                    <h2 className="font-semibold text-lg mb-4">
                        {title} ({count.toString().padStart(2, "0")})
                    </h2>
                    {children}
                </>
            )}
        </section>
    );
}

export default CoursesBlogsLayout;
