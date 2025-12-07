import { Button } from "antd";
import { useState } from "react";
import CourseDetailWrapper from "./CourseDetailWrapper";

type CourseDescriptionProps = {
    description: string;
};

function CourseDescription({ description }: CourseDescriptionProps) {
    const [isShowMore, setIsShowMore] = useState(false);

    return (
        <CourseDetailWrapper title="Description">
            <p className={`${isShowMore ? "" : "truncate-text"} leading-7`}>
                {description}
            </p>
            <Button
                type="text"
                className="hover:bg-transparent! p-0! underline text-primary-700! font-semibold! mt-2! hover:-translate-y-0.5"
                onClick={() => setIsShowMore((currentState) => !currentState)}
            >
                {isShowMore ? "Show less" : "Show more"}
            </Button>
        </CourseDetailWrapper>
    );
}

export default CourseDescription;
