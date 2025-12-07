import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleClearCart } from "@/api/cart/cart";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useClearCart() {
    const queryClient = useQueryClient();

    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { mutate: clearCart, isPending: isClearingCart } = useMutation({
        mutationFn: async () => handleClearCart(token),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_MY_CART],
            }),
    });

    return { clearCart, isClearingCart };
}
