import { useQuery } from "@tanstack/react-query";

import { handleGetProfileById } from "@/api/user/user";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useGetProfileById(id?: string) {
    const {
        data: profile,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_PROFILE, id],
        queryFn: () => handleGetProfileById(id),
        enabled: !!id,
        retry: false,
    });

    return { profile, isLoading, error };
}
