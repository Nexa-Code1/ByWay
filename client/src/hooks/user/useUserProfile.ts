import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { handleGetProfile } from "../../api/user/user";
import { QUERY_KEYS } from "../../utils/queryKeys";

export function useUserProfile() {
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const {
        data: userProfile,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.USER_PROFILE],
        queryFn: () => handleGetProfile(token),
        retry: false,
        enabled: !!token,
    });

    return { userProfile, isLoading, error };
}
