import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/api/orders/orders";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useOrderById(orderId: string) {
    const {
        data,
        isLoading: isLoadingOrder,
        error,
        refetch,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_ORDER_BY_ID, orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId, // Only run query if orderId exists
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        order: data?.order,
        isLoadingOrder,
        error,
        refetchOrder: refetch,
    };
}
