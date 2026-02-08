import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetBlogDetails } from "@/api/blogs/blogs";

export function useGetBlogById(id?: string) {
    const {
        data: blogRes,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_BLOG_DETAILS, id],
        queryFn: () => handleGetBlogDetails(id),
        retry: false,
        enabled: !!id,
    });

    return { blogRes, isLoading, error };
}
