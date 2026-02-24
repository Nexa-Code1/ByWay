import { useQuery } from "@tanstack/react-query";
import { getStudentOrders } from "@/api/orders/orders";
import { QUERY_KEYS } from "@/utils/queryKeys";

interface UseStudentOrdersParams {
    page?: number;
    limit?: number;
    status?: string;
}

export function useStudentOrders(params?: UseStudentOrdersParams) {
    const {
        data,
        isLoading: isLoadingOrders,
        error,
        refetch,
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_STUDENT_ORDERS, params],
        queryFn: () => getStudentOrders(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        orders: data?.orders || [],
        pagination: data?.pagination,
        isLoadingOrders,
        error,
        refetchOrders: refetch,
    };
}
