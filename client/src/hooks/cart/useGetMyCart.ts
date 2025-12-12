import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetMyCart } from "@/api/cart/cart";

export function useGetMyCart() {
    const {
        data: myCart,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_MY_CART],
        queryFn: handleGetMyCart,
        retry: false,
    });

    return { myCart, isLoading, error };
}
