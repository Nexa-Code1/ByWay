import { Button, message } from "antd";
import { Navigate, useNavigate } from "react-router";

import { usePublishCourse } from "@/hooks/courses/usePublishCourse";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";
import Spinner from "@/components/shared/Spinner";
import FormActions from "@/instructor/components/common/FormActions";
import CourseContentSummary from "./components/CourseContentSummary";
import CourseImagePreview from "./components/CourseImagePreview";
import CourseDataEle from "./components/CourseDataEle";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import { useEffect } from "react";

function CreateCoursePublish() {
    const navigate = useNavigate();

    const { state, resetCourse, canPublish, hasCourseContent, hasBasicInfo } =
        useNewCourseContext();

    const { courseDetails, isLoading, error } = useGetCourseDetails(
        state.draftCourseId || "",
    );
    const { publishCourse, isPublishingCourse } = usePublishCourse();

    useEffect(() => {
        if (!hasBasicInfo) {
            navigate("/instructor/create-course/basic-information");
            return;
        }
    }, [hasBasicInfo]);

    const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Use context validation function to check if all required data exists
        if (!canPublish) {
            return message.error(
                "Please complete all required course information, add course content with lessons, and upload a course image before publishing.",
            );
        } else {
            await publishCourse({ courseId: state.draftCourseId || "" });
            resetCourse();
            navigate("/instructor/my-courses");
        }
    };

    const handleCancel = () => {
        resetCourse();
        navigate("/instructor/my-courses");
    };

    if (!hasCourseContent)
        return <Navigate to="/instructor/create-course/basic-information" />;

    if (isPublishingCourse) {
        return <Spinner className="text-primary-700! mt-50!" size="large" />;
    }

    return (
        <form onSubmit={handlePublish} className="mb-10">
            {/* Course Preview */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Preview
                    {!isLoading && !error && courseDetails?.status && (
                        <span className="mx-4 px-4 py-1 text-sm bg-orange-100 rounded-full text-gray-100">
                            {courseDetails?.status}
                        </span>
                    )}
                </h2>

                <div className="space-y-4">
                    <ul>
                        <CourseDataEle title="title" value={state.title} />
                        <CourseDataEle
                            title="subTitle"
                            value={state.subTitle}
                        />
                        <CourseDataEle
                            title="price"
                            value={state.price.toString()}
                        />
                        <CourseDataEle
                            title="description"
                            value={state.description}
                        />
                        <CourseDataEle
                            title="requirements"
                            value={state.requirements.join(" | ")}
                        />
                    </ul>

                    {/* Course Content Summary */}
                    <CourseContentSummary courseContent={state.courseContent} />

                    {state.imagePreview && (
                        <CourseImagePreview imagePreview={state.imagePreview} />
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-4">
                <Button
                    onClick={() =>
                        navigate("/instructor/create-course/curriculum")
                    }
                    className="border-orange-100! text-orange-100! hover:-translate-y-0.5"
                    disabled={isPublishingCourse}
                >
                    Back to Edit
                </Button>

                <FormActions
                    onCancel={handleCancel}
                    submitLabel={
                        isPublishingCourse ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent border-r-transparent animate-spin"></div>
                                Publishing...
                            </>
                        ) : (
                            "Publish Course"
                        )
                    }
                    isLoading={isPublishingCourse}
                    disabled={
                        !isLoading &&
                        !error &&
                        courseDetails?.status === "published"
                    }
                />
            </div>
        </form>
    );
}

export default CreateCoursePublish;
