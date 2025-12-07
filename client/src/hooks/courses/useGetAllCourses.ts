import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { handleGetAllCourses } from "@/api/courses/courses";
import type { IFilterCoursesBy } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useGetAllCourses(filter: IFilterCoursesBy) {
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const {
        data: courses,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_COURSES, filter],
        queryFn: () => handleGetAllCourses(filter, token),
        retry: false,
    });

    return { courses, isLoading, error };
}
