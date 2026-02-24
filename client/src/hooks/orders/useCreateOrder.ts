import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleCreateOrder } from "@/api/orders/orders";
import type { OrderData } from "@/types";
import { useClearCart } from "../cart/useClearCart";

export function useCreateOrder() {
    const { clearCart } = useClearCart();
    const navigate = useNavigate();

    const { mutateAsync: createOrder, isPending: isCreatingOrder } =
        useMutation({
            mutationFn: async ({ orderData }: { orderData: OrderData }) =>
                handleCreateOrder(orderData),
            onSuccess: async (data) => {
                message.success(data.message);
                navigate("/");
                clearCart();
            },
            onError: (error) => message.error(error.message),
        });

    return { createOrder, isCreatingOrder };
}
