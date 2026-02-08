import { useSearchParams } from "react-router";

import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import ItemsPagination from "@/components/shared/ItemsPagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import CourseCard from "@/components/shared/CourseCard";
import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import type { ICourseDetails, ISortCoursesBy } from "@/types";

function CoursesDisplay() {
    const [searchParams] = useSearchParams();

    const {
        courses,
        isLoading: isLoadingCourses,
        error: coursesError,
    } = useGetAllCourses({
        title: searchParams.get("searchTitle") || "",
        category: searchParams.get("category") || "",
        sort: (searchParams.get("sort") as ISortCoursesBy) || undefined,
        price: searchParams.get("price") || "",
        limit: ITEMS_PER_PAGE,
        page: Number(searchParams.get("page")) || 1,
    });

    if (!isLoadingCourses && coursesError) return <Error />;

    return (
        <SectionContainer className="mt-4!">
            {isLoadingCourses ? (
                <Spinner className="text-primary-700! mt-20!" size="large" />
            ) : !isLoadingCourses && !courses?.courses.length ? (
                <NoContent
                    imgSrc={emptyFolderImg}
                    title="No Courses"
                    subTitle="Cannot find courses. Please try again."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses?.courses.map((course: ICourseDetails) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                    {courses?.pagination && (
                        <ItemsPagination pagination={courses.pagination} />
                    )}
                </>
            )}
        </SectionContainer>
    );
}

export default CoursesDisplay;
