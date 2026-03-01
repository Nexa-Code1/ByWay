import { useQuery } from "@tanstack/react-query";

import { handleGetStudentCourses } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export function useGetStudentCourses({
    limit = ITEMS_PER_PAGE,
    page = 1,
}: {
    limit?: number;
    page?: number;
}) {
    const { data, isLoading, error } = useQuery({
        queryFn: () =>
            handleGetStudentCourses({
                limit,
                page,
            }),
        queryKey: [QUERY_KEYS.GET_STUDENT_COURSES, limit, page],
        retry: false,
    });

    return {
        studentCourses: data?.courses || [],
        pagination: data?.pagination,
        isLoading,
        error,
    };
}
