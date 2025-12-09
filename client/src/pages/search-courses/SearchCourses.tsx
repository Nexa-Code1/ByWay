import { useSearchParams } from "react-router";

import searchCoursesImg from "@/assets/images/search-courses.jpg";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import SelectCategory from "./components/SelectCategory";
import CoursesResult from "./components/CoursesResult";
import SearchForm from "./components/SearchForm";
import Sort from "./components/Sort";
import PriceSlider from "./components/PriceSlider";
import type { ISortCoursesBy } from "@/types";
import CoursesPagination from "./components/CoursesPagination";
import { COURSES_PER_PAGE } from "@/utils/constants";

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
                <SearchForm />
                <div className="absolute top-[calc(50%+24px)] left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <SelectCategory />
                    <Sort />
                    <PriceSlider />
                </div>
            </div>
            <SectionContainer className="mt-4!">
                {isLoadingCourses && (
                    <Spinner className="text-primary-700!" size="large" />
                )}
                {!isLoadingCourses && courses && (
                    <>
                        <CoursesResult courses={courses.courses} />
                        <CoursesPagination total={courses.courses.length} />
                    </>
                )}
            </SectionContainer>
        </>
    );
}

export default SearchCourses;
