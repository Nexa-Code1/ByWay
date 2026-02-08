import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetInstructorBlogs } from "@/api/blogs/blogs";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export function useGetInstructorBlogs({
    instructorId,
    page = 1,
    limit = ITEMS_PER_PAGE,
}: {
    instructorId?: string;
    page?: number;
    limit?: number;
}) {
    const {
        data: blogsRes,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            QUERY_KEYS.GET_ALL_INSTRUCTOR_BLOGS,
            instructorId,
            page,
            limit,
        ],
        queryFn: () => handleGetInstructorBlogs({ instructorId, page, limit }),
        retry: false,
        enabled: !!instructorId,
    });

    return { blogsRes, isLoading, error };
}
