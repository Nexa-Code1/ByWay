import { useMutation } from "@tanstack/react-query";

import { handleVerifyEmail } from "../../api/auth/auth";

export function useVerifyEmail() {
    const {
        mutate: verifyEmail,
        isPending: isVerifyingEmail,
        data,
        error,
    } = useMutation({
        mutationFn: handleVerifyEmail,
    });

    return { verifyEmail, isVerifyingEmail, data, error };
}
