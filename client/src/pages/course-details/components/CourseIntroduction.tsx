import { FieldTimeOutlined } from "@ant-design/icons";

import TextDescription from "@/components/shared/TextDescription";
import NavBreadCrumb from "@/components/shared/NavBreadCrumb";
import type { ICourseDetails } from "@/types";
import UnderlineLink from "@/components/shared/UnderlineLink";
import { format } from "date-fns";

type CourseIntroductionProps = {
    courseDetails: ICourseDetails;
};

function CourseIntroduction({ courseDetails }: CourseIntroductionProps) {
    const lang = "en";
    const { title, subTitle, category, instructor, updatedAt } = courseDetails;

    return (
        <div className="max-w-xl">
            <NavBreadCrumb
                items={[
                    { title: "Courses", path: "/courses" },
                    {
                        title: category.name[lang],
                        path: `/courses?category=${category.slug}`,
                    },
                    {
                        title,
                    },
                ]}
            />
            <h1 className="font-semibold text-3xl my-6">{title}</h1>
            <TextDescription className="lg:text-gray-100 text-base!">
                {subTitle}
            </TextDescription>
            <p className="text-sm mt-4 flex items-center gap-2">
                <span>Created by</span>
                <UnderlineLink to={`/instructors/${instructor._id}`}>
                    {instructor.firstName} {instructor.lastName}
                </UnderlineLink>
            </p>
            <p className="text-sm mt-4 flex items-center gap-2">
                <FieldTimeOutlined />
                <span>Last updated {format(new Date(updatedAt), "M/y")}</span>
            </p>
        </div>
    );
}

export default CourseIntroduction;
