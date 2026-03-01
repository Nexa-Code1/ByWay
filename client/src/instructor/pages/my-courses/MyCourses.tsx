import { useSearchParams } from "react-router";
import { Radio, type CheckboxProps } from "antd";

import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import { useGetInstructorCourses } from "@/hooks/courses/useGetInstructorCourses";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import InstructorCourseCard from "./components/InstructorCourseCard";
import type { CourseStatusType, ICourse } from "@/types";
import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import ItemsPagination from "@/components/shared/ItemsPagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";

function MyCourses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const status = (searchParams.get("status") as CourseStatusType) || "";

    const {
        userProfile,
        isLoading: isLoadingUser,
        error: userProfileError,
    } = useUserProfile();

    const {
        instructorCourses,
        isLoading: isLoadingCourses,
        error: coursesError,
    } = useGetInstructorCourses({
        instructorId: userProfile?.user._id,
        status,
        page: Number(searchParams.get("page")) || 1,
        limit: ITEMS_PER_PAGE,
    });

    if (
        !isLoadingCourses &&
        !isLoadingUser &&
        (userProfileError || coursesError || !instructorCourses)
    )
        return <Error />;

    const onChange: CheckboxProps["onChange"] = (e) => {
        setSearchParams({ status: e.target.value });
    };

    return (
        <div className="mb-10">
            <div className="mb-6">
                <label className="font-medium text-sm mr-2">
                    Course Status:{" "}
                </label>
                <Radio.Group defaultValue={status} onChange={onChange}>
                    <Radio.Button value="">All</Radio.Button>
                    <Radio.Button value="draft">Draft</Radio.Button>
                    <Radio.Button value="published">Published</Radio.Button>
                </Radio.Group>
            </div>

            {isLoadingUser || isLoadingCourses ? (
                <Spinner className="text-primary-700! mt-50!" size="large" />
            ) : !instructorCourses.courses.length ? (
                <NoContent
                    imgSrc={emptyFolderImg}
                    title="No Courses Found"
                    subTitle="Empty courses list. Start creating one."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
                        {instructorCourses.courses.map((course: ICourse) => (
                            <InstructorCourseCard
                                course={course}
                                key={course._id}
                            />
                        ))}
                    </div>
                    <ItemsPagination
                        pagination={instructorCourses.pagination}
                    />
                </>
            )}
        </div>
    );
}

export default MyCourses;
