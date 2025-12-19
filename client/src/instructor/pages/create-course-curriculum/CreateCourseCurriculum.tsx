import { Navigate } from "react-router";
import { type FormEvent } from "react";
import { useCookies } from "react-cookie";

import { useCreateCourseSection } from "@/hooks/courseSections/useCreateCourseSection";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import CourseSection from "./components/CourseSection";
import type { ICourseContent } from "@/types";

function CreateCourseCurriculum() {
    const [cookies] = useCookies(["draftCourseId"]);
    const { draftCourseId } = cookies;

    const { createCourseSection, isCreatingCourseSection } =
        useCreateCourseSection();
    const { courseDetails, isLoading, error } =
        useGetCourseDetails(draftCourseId);

    function addNewSectionHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createCourseSection({
            courseId: draftCourseId,
            section: "New section",
        });
    }

    if (!draftCourseId)
        return <Navigate to="/instructor/create-course/basic-information" />;

    return (
        <div className="mb-8">
            {!isLoading &&
                !error &&
                courseDetails?.course?.content?.map(
                    (item: ICourseContent, index: number) => (
                        <CourseSection
                            key={item._id}
                            courseId={draftCourseId}
                            item={item}
                            index={index}
                        />
                    )
                )}

            <form onSubmit={addNewSectionHandler}>
                <AppSubmitBtn
                    isLoading={isCreatingCourseSection}
                    className="w-full! bg-amber-50! text-orange-100! font-medium! border-0! hover:bg-amber-100! hover:translate-y-0"
                >
                    Add Sections
                </AppSubmitBtn>
            </form>
        </div>
    );
}

export default CreateCourseCurriculum;
