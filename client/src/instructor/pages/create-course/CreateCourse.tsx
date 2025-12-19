import { Outlet } from "react-router";
import { useCookies } from "react-cookie";

import CreateCourseNav from "./components/CreateCourseNav";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import PageSpinner from "@/components/shared/PageSpinner";
import Error from "@/components/shared/Error";

function CreateCourse() {
    const [cookies] = useCookies(["draftCourseId"]);
    const { draftCourseId } = cookies;

    const { courseDetails, isLoading, error } =
        useGetCourseDetails(draftCourseId);

    if (isLoading) return <PageSpinner />;
    if (!isLoading && error) return <Error />;

    return (
        <div>
            <CreateCourseNav courseDetails={courseDetails?.course} />
            <Outlet />
        </div>
    );
}

export default CreateCourse;
