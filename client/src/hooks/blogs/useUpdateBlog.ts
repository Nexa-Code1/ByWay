import { message } from "antd";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateBlog } from "@/api/blogs/blogs";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateBlog() {
    const queryClient = useQueryClient();

    const { mutate: updateBlog, isPending: isUpdatingBlog } = useMutation({
        mutationFn: handleUpdateBlog,
        onSuccess: () => {
            message.success("Blog updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.GET_ALL_INSTRUCTOR_BLOGS,
                    QUERY_KEYS.GET_ALL_BLOGS,
                ],
            });
        },
        onError: (error) => {
            message.error(error.message || "Failed to update blog");
        },
    });

    return { updateBlog, isUpdatingBlog };
}
