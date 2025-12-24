import { useMutation } from "@tanstack/react-query";
import { handleCreateSetupIntent } from "@/api/payment/payment";

export function useCreateSetupIntent() {
    const { mutate: createSetupIntent, isPending: isCreatingSetupIntent } =
        useMutation({
            mutationFn: handleCreateSetupIntent,
        });

    return { createSetupIntent, isCreatingSetupIntent };
}
