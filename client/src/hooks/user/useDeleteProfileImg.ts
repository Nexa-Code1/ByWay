import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { message } from "antd";

import { handleDeleteProfileImg } from "@/api/user/user";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useDeleteProfileImg() {
    const queryClient = useQueryClient();
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { mutate: deleteProfileImg, isPending } = useMutation({
        mutationFn: () => handleDeleteProfileImg(token),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
            message.success("Profile image was deleted successfully");
        },
        onError: () =>
            message.error(
                "Something went error cannot delete profile image. Please try again later."
            ),
    });

    return { deleteProfileImg, isPending };
}
