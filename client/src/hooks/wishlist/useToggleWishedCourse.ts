import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
    handleAddToWishlist,
    handleDeleteFromWishlist,
} from "@/api/wishlist/wishlist";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useToggleWishedCourse() {
    const queryClient = useQueryClient();
    const [cookies] = useCookies(["token"]);
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate: toggleWishedCourse, isPending: isTogglingWishedCourse } =
        useMutation({
            mutationFn: async ({
                courseId,
                isFavourite,
            }: {
                courseId: string;
                isFavourite: boolean;
            }) => {
                if (!cookies.token) return;
                return isFavourite
                    ? handleDeleteFromWishlist(cookies.token, courseId)
                    : handleAddToWishlist(cookies.token, courseId);
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.GET_COURSE_DETAILS,
                        variables.courseId,
                    ],
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_MY_CART],
                });
                messageApi.success(
                    `Course was ${
                        variables.isFavourite ? "deleted" : "added"
                    } successfully ${
                        variables.isFavourite ? "from" : "to"
                    } your wishlist`
                );
            },
            onError: (_, variables) =>
                messageApi.error(
                    `Something went wrong. Cannot ${
                        variables.isFavourite ? "delete" : "add"
                    } course ${
                        variables.isFavourite ? "from" : "to"
                    } wishlist. Please try again later.`
                ),
        });

    return { toggleWishedCourse, isTogglingWishedCourse, contextHolder };
}
