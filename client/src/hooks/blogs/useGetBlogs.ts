import { useQuery } from "@tanstack/react-query";

import type { IFilterBlogsBy } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetBlogs } from "@/api/blogs/blogs";

export function useGetBlogs(filter: IFilterBlogsBy) {
    const {
        data: blogsRes,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_BLOGS, filter],
        queryFn: () => handleGetBlogs(filter),
        retry: false,
    });

    return { blogsRes, isLoading, error };
}
