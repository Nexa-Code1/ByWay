import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleDeleteProfileImg } from "@/api/user/user";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useDeleteProfileImg() {
    const queryClient = useQueryClient();

    const { mutate: deleteProfileImg, isPending } = useMutation({
        mutationFn: handleDeleteProfileImg,
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
