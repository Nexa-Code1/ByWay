import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleAddPaymentMethod } from "@/api/payment/payment";

export function useAddPaymentMethod() {
    const queryClient = useQueryClient();

    const { mutateAsync: addPaymentMethod, isPending: isAddingPaymentMethod } =
        useMutation({
            mutationFn: async ({
                paymentMethodId,
            }: {
                paymentMethodId: string;
            }) => handleAddPaymentMethod(paymentMethodId),
            onSuccess: () => {
                message.success("Payment method was added successfully.");
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_PAYMENT_METHODS],
                });
            },
            onError: () =>
                message.error(
                    "Something went wrong. Cannot add payment method."
                ),
        });

    return { addPaymentMethod, isAddingPaymentMethod };
}
