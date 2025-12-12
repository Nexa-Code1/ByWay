import { handleGetCourseDetails } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useGetCourseDetails(id?: string) {
    const {
        data: courseDetails,
        isLoading,
        error,
    } = useQuery({
        queryFn: () => handleGetCourseDetails(id),
        queryKey: [QUERY_KEYS.GET_COURSE_DETAILS, id],
        enabled: !!id,
        retry: false,
    });

    return { courseDetails, isLoading, error };
}
