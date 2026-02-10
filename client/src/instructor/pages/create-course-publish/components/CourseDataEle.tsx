import type { ReactNode } from "react";

type CourseDataEleProps = {
    title: string;
    value: ReactNode;
};

function CourseDataEle({ title, value }: CourseDataEleProps) {
    return (
        <li className="font-medium text-gray-700 flex items-center gap-2">
            <span className="font-semibold text-primary-600">{title}:</span>
            <span className="text-sm">{value}</span>
        </li>
    );
}

export default CourseDataEle;
