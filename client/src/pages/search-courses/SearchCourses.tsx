import { useSearchParams } from "react-router";

import searchCoursesImg from "@/assets/images/search-courses.jpg";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import SelectCategory from "./components/SelectCategory";
import SearchForm from "./components/SearchForm";
import Sort from "./components/Sort";
import PriceSlider from "./components/PriceSlider";
import type { ICourseDetails, ISortCoursesBy } from "@/types";
import CoursesPagination from "./components/CoursesPagination";
import { COURSES_PER_PAGE } from "@/utils/constants";
import CourseCard from "@/components/shared/CourseCard";
import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";

function SearchCourses() {
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
        limit: COURSES_PER_PAGE,
        page: Number(searchParams.get("page")) || 1,
    });

    if (!isLoadingCourses && coursesError) return <Error />;

    return (
        <>
            <div className="relative w-full h-48">
                <img
                    src={searchCoursesImg}
                    alt="Search for courses"
                    className="w-full h-full object-cover object-center"
                />
                <div className="w-[90%] max-w-xl absolute top-1/2 left-1/2 -translate-1/2 grid grid-cols-4 gap-2">
                    <SearchForm />
                    <SelectCategory />
                    <Sort />
                    <PriceSlider />
                </div>
            </div>
            <SectionContainer className="mt-4!">
                {isLoadingCourses && (
                    <Spinner
                        className="text-primary-700! mt-20!"
                        size="large"
                    />
                )}
                {!isLoadingCourses && !courses.courses.length ? (
                    <NoContent
                        imgSrc={emptyFolderImg}
                        title="No Courses"
                        subTitle="Cannot find ourses. Please try again."
                    />
                ) : (
                    !isLoadingCourses &&
                    courses && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {courses.courses.map(
                                    (course: ICourseDetails) => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                        />
                                    )
                                )}
                            </div>
                            <CoursesPagination total={courses.courses.length} />
                        </>
                    )
                )}
            </SectionContainer>
        </>
    );
}

export default SearchCourses;
