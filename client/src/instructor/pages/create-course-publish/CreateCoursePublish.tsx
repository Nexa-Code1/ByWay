import { Navigate, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { CheckCircleOutlined } from "@ant-design/icons";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { usePublishCourse } from "@/hooks/courses/usePublishCourse";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";

function CreateCoursePublish() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(["newCourseId"]);
    const { newCourseId } = cookies;

    const { courseDetails } = useGetCourseDetails(newCourseId);
    const { publishCourse, isPublishingCourse } = usePublishCourse();

    function publishCourseHandler() {
        removeCookie("newCourseId");
        publishCourse({ courseId: newCourseId });
        navigate("/instructor/my-courses");
    }

    if (!newCourseId || !courseDetails?.course.content.length)
        return <Navigate to="/instructor/create-course/basic-information" />;

    return (
        <div className="flex flex-col items-center text-center gap-4">
            <CheckCircleOutlined className="text-primary-main! text-6xl!" />

            <p className="font-medium text-lg">
                You’ve successfully completed all the steps to create your
                course
            </p>
            <p>
                Your course is currently saved as a draft and is not visible to
                learners yet.
            </p>
            <p>
                You’re now in the final step
                <br /> Once you publish the course, it will become publicly
                available and visible to all users on the platform.
            </p>
            <p>
                You can still edit your content after publishing, but publishing
                confirms that your course is ready for learners.
            </p>
            <p className="text-primary-700 font-medium">
                When you’re ready, click “Publish Course” to make it live.
            </p>

            <form onSubmit={publishCourseHandler}>
                <AppSubmitBtn
                    isLoading={isPublishingCourse}
                    type="primary"
                    className="bg-orange-100!"
                >
                    Publish Course
                </AppSubmitBtn>
            </form>
        </div>
    );
}

export default CreateCoursePublish;
