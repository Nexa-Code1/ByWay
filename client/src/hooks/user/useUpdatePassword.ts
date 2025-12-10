import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCookies } from "react-cookie";

import { handleUpdatePassword } from "@/api/user/user";
import type { IUpdatePassword } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdatePassword() {
    const queryClient = useQueryClient();
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { mutateAsync: updatePassword, isPending } = useMutation({
        mutationFn: async ({ values }: { values: IUpdatePassword }) => {
            handleUpdatePassword(token, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
            message.success("Password updated successfully");
        },
        onError: () =>
            message.error(
                "Something went error cannot update password. Please try again later."
            ),
    });

    return { updatePassword, isPending };
}
