import { handleGetInstructorCourses } from "@/api/courses/courses";
import type { CourseStatusType } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useGetInstructorCourses(
    instructorId: string,
    status: CourseStatusType | ""
) {
    const {
        data: instructorCourses,
        isLoading,
        error,
    } = useQuery({
        queryFn: () => handleGetInstructorCourses(instructorId, status),
        queryKey: [QUERY_KEYS.GET_INSTRUCTOR_COURSES, instructorId, status],
        enabled: !!instructorId,
        retry: false,
    });

    return { instructorCourses, isLoading, error };
}
