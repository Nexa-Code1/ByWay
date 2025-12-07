import type { ReactNode } from "react";

import SectionHeader from "@/components/shared/SectionHeader";

type CourseDetailWrapperProps = {
    title: string;
    children: ReactNode;
};

function CourseDetailWrapper({ title, children }: CourseDetailWrapperProps) {
    return (
        <div>
            <SectionHeader title={title} />
            {children}
        </div>
    );
}

export default CourseDetailWrapper;
