import { useCookies } from "react-cookie";

import { handleAddToCart } from "@/api/cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useAddToCart() {
    const queryClient = useQueryClient();

    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
        mutationFn: async ({ courseId }: { courseId: string }) => {
            if (!courseId) return;
            return handleAddToCart(token, courseId);
        },
        onSuccess: (_, variables) =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_COURSE_DETAILS, variables.courseId],
            }),
    });

    return { addToCart, isAddingToCart };
}
