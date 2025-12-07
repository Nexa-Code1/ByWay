import type { IInstructor } from "@/types";
import CourseDetailWrapper from "./CourseDetailWrapper";
import UserAvatar from "@/components/layout/navbar/UserAvatar";
import UnderlineLink from "@/components/shared/UnderlineLink";

type CourseInstructorInfoProps = {
    instructor: IInstructor;
};

function CourseInstructorInfo({ instructor }: CourseInstructorInfoProps) {
    return (
        <CourseDetailWrapper title="Instructor">
            <UnderlineLink
                to={`/instructors/${instructor._id}`}
                className="text-lg"
            >
                {instructor.firstName} {instructor.lastName}
            </UnderlineLink>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center mt-3">
                <UserAvatar
                    avatar={instructor.image}
                    userName={instructor.firstName}
                    size={80}
                />
                <span>
                    Bundling the courses and know how of successful instructors,
                    Academind strives to deliver high quality online education.
                </span>
            </div>
        </CourseDetailWrapper>
    );
}

export default CourseInstructorInfo;
