import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleRemovePaymentMethod } from "@/api/payment/payment";

export function useRemovePaymentMethod() {
    const queryClient = useQueryClient();

    const { mutate: removePaymentMethod, isPending: isRemovingPaymentMethod } =
        useMutation({
            mutationFn: async ({
                paymentMethodId,
            }: {
                paymentMethodId: string;
            }) => handleRemovePaymentMethod(paymentMethodId),
            onSuccess: () => {
                message.success("Payment method was deleted successfully.");
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_PAYMENT_METHODS],
                });
            },
            onError: () =>
                message.error(
                    "Something went wrong. Cannot delete payment method."
                ),
        });

    return { removePaymentMethod, isRemovingPaymentMethod };
}
