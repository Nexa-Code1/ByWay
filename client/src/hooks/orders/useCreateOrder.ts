import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleCreateOrder } from "@/api/orders/orders";
import type { OrderData } from "@/types";
import { useClearCart } from "../cart/useClearCart";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useCreateOrder() {
    const { clearCart } = useClearCart();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: createOrder, isPending: isCreatingOrder } =
        useMutation({
            mutationFn: async ({ orderData }: { orderData: OrderData }) =>
                handleCreateOrder(orderData),
            onSuccess: async (data) => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_STUDENT_ORDERS],
                });
                message.success(data.message);
                navigate("/");
                clearCart();
            },
            onError: (error) => message.error(error.message),
        });

    return { createOrder, isCreatingOrder };
}
