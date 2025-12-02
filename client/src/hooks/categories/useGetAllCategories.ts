import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetAllCategories } from "@/api/categories/categories";

export function useGetAllCategories() {
    const {
        data: categories,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
        queryFn: handleGetAllCategories,
        retry: false,
    });

    return { categories, isLoading, error };
}
