import { useQuery } from "@tanstack/react-query";

import { handleGetMyWishlist } from "@/api/wishlist/wishlist";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useGetMyWishlist() {
    const {
        data: wishlist,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_MY_WISHLIST],
        queryFn: handleGetMyWishlist,
        retry: false,
    });

    return { wishlist, isLoading, error };
}
