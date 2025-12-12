import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleClearCart } from "@/api/cart/cart";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useClearCart() {
    const queryClient = useQueryClient();

    const { mutate: clearCart, isPending: isClearingCart } = useMutation({
        mutationFn: handleClearCart,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_MY_CART],
            }),
    });

    return { clearCart, isClearingCart };
}
