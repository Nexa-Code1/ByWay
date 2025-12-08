import { handleGetMyWishlist } from "@/api/wishlist/wishlist";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export function useGetMyWishlist() {
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { data: wishlist, isPending } = useQuery({
        queryKey: [QUERY_KEYS.GET_MY_WISHLIST],
        queryFn: () => handleGetMyWishlist(token),
        retry: false,
        enabled: !!token,
    });

    return { wishlist, isPending };
}
