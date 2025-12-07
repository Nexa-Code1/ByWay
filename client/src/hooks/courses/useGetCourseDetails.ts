import { handleGetCourseDetails } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetCourseDetails(id?: string) {
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const {
        data: courseDetails,
        isLoading,
        error,
    } = useQuery({
        queryFn: () => handleGetCourseDetails(token, id),
        queryKey: [QUERY_KEYS.GET_COURSE_DETAILS, id],
        enabled: !!id || !!token,
        retry: false,
    });

    return { courseDetails, isLoading, error };
}
