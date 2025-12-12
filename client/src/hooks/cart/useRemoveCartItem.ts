import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRemoveCartItem } from "@/api/cart/cart";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useRemoveCartItem() {
    const queryClient = useQueryClient();

    const { mutate: removeCartItem, isPending: isRemovingCartItem } =
        useMutation({
            mutationFn: async ({ courseId }: { courseId: string }) => {
                if (!courseId) return;
                return handleRemoveCartItem(courseId);
            },
            onSuccess: () =>
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_MY_CART],
                }),
        });

    return { removeCartItem, isRemovingCartItem };
}
