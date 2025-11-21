import { useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleSendOTP } from "../../api/auth/auth";

export function useSendOTP() {
    const [messageApi, contextHolder] = message.useMessage();
    const [, setSearchParams] = useSearchParams();

    const { mutateAsync: sendOTP, isPending: isSendingOTP } = useMutation({
        mutationFn: handleSendOTP,
        onSuccess: (data, variables) => {
            messageApi.success(data.message);
            setSearchParams({ auth: "verify-otp", email: variables.email });
        },
        onError: (error) => messageApi.error(error.message),
    });

    return { sendOTP, isSendingOTP, contextHolder };
}
