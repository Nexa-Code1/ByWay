import { useQuery } from "@tanstack/react-query";

import { handleGetInstructorCourses } from "@/api/courses/courses";
import type { CourseStatusType } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export function useGetInstructorCourses({
    status,
    limit = ITEMS_PER_PAGE,
    page = 1,
    instructorId,
}: {
    status: CourseStatusType | "";
    limit?: number;
    page?: number;
    instructorId?: string;
}) {
    const {
        data: instructorCourses,
        isLoading,
        error,
    } = useQuery({
        queryFn: () =>
            handleGetInstructorCourses({
                status,
                limit,
                page,
                instructorId,
            }),
        queryKey: [
            QUERY_KEYS.GET_INSTRUCTOR_COURSES,
            instructorId,
            status,
            limit,
            page,
        ],
        enabled: !!instructorId,
        retry: false,
    });

    return { instructorCourses, isLoading, error };
}
