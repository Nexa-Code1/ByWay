import { useQuery } from "@tanstack/react-query";

import { handleGetProfile } from "@/api/user/user";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUserProfile() {
    const {
        data: userProfile,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.USER_PROFILE],
        queryFn: handleGetProfile,
        staleTime: 0,
        retry: false,
    });

    return { userProfile, isLoading, error };
}
