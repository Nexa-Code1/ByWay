import { useMutation } from "@tanstack/react-query";
import { handleCreateSetupIntent } from "@/api/payment/payment";
import { message } from "antd";

export function useCreateSetupIntent() {
    const { mutateAsync: createSetupIntent, isPending: isCreatingSetupIntent } =
        useMutation({
            mutationFn: handleCreateSetupIntent,
            onError: (error) => message.error(error.message),
        });

    return { createSetupIntent, isCreatingSetupIntent };
}
