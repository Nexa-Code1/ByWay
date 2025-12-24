import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetPaymentMethods } from "@/api/payment/payment";

export function useGetPaymentMethods() {
    const {
        data: paymentMethods,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_PAYMENT_METHODS],
        queryFn: handleGetPaymentMethods,
        retry: false,
    });

    return { paymentMethods, isLoading, error };
}
