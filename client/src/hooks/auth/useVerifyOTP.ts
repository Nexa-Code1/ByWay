import { useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleVerifyOTP } from "@/api/auth/auth";
import type { IVerifyOTP } from "@/types";

export function useVerifyOTP() {
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");

    const { mutateAsync: verifyOTP, isPending: isVerifyingOTP } = useMutation({
        mutationFn: async (formValues: IVerifyOTP) => {
            if (!email) {
                message.error("Email is required. Please try again.");
                return;
            }
            return handleVerifyOTP({ ...formValues, email });
        },
        onSuccess: (data) => {
            if (email) {
                message.success(data.message);
                setSearchParams({ auth: "reset-password", email });
            }
        },
        onError: (error) => message.error(error.message),
    });

    return { verifyOTP, isVerifyingOTP };
}
