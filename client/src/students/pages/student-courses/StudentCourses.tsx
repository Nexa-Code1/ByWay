import { useSearchParams } from "react-router";

import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import OutletHeader from "@/components/shared/OutletHeader";
import ItemsPagination from "@/components/shared/ItemsPagination";
import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { useGetStudentCourses } from "@/hooks/courses/useGetStudentCourses";
import CourseItem from "./components/CourseItem";
import type { IStudentCourseItem } from "@/types";

function StudentCourses() {
    const [searchParams] = useSearchParams();

    const { studentCourses, pagination, isLoading, error } =
        useGetStudentCourses({
            page: Number(searchParams.get("page")) || 1,
            limit: ITEMS_PER_PAGE,
        });

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-30!" />;
    if (!isLoading && (error || !studentCourses)) return <Error />;
    if (studentCourses.length === 0)
        return (
            <NoContent
                imgSrc={emptyFolderImg}
                title="No Courses"
                subTitle="Start Purchasing courses"
            />
        );

    return (
        <div>
            <OutletHeader>Courses ({studentCourses.length})</OutletHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {studentCourses.map((course: IStudentCourseItem) => (
                    <CourseItem key={course._id} course={course} />
                ))}
            </div>
            <ItemsPagination pagination={pagination} />
        </div>
    );
}

export default StudentCourses;
