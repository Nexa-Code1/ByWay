import api from "../api";
import { catchError } from "../catchError";
import type { OrderData } from "@/types";

export async function handleCreateOrder(orderData: OrderData) {
    try {
        const res = await api.post(`orders/create-order`, orderData);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function getStudentOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
}) {
    try {
        const res = await api.get(`orders/student-orders`, { params });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function getOrderById(orderId: string) {
    try {
        const res = await api.get(`orders/${orderId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
