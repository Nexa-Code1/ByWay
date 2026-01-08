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

    console.log(courses);

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {courses.courses.map((course: ICourseDetails) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                        <CoursesPagination total={courses.courses.length} />
                    </>
                )}
            </SectionContainer>
        </>
    );
}

export default SearchCourses;
