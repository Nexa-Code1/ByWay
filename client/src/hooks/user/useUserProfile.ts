import { useQuery } from "@tanstack/react-query";

import { handleGetProfile } from "@/api/user/user";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { getAccessToken } from "@/utils/tokenService";

export function useUserProfile() {
    const accessToken = getAccessToken();

    const {
        data: userProfile,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: [QUERY_KEYS.USER_PROFILE],
        queryFn: handleGetProfile,
        retry: false,
        enabled: !!accessToken,
    });

    return { userProfile, isLoading, error, refetch };
}
