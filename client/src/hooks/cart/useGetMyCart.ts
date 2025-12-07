import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetMyCart } from "@/api/cart/cart";

export function useGetMyCart() {
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const {
        data: myCart,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_MY_CART],
        queryFn: () => handleGetMyCart(token),
        retry: false,
    });

    return { myCart, isLoading, error };
}
