import { message } from "antd";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateBlog } from "@/api/blogs/blogs";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useCreateBlog() {
    const queryClient = useQueryClient();

    const { mutate: createBlog, isPending: isCreatingBlog } = useMutation({
        mutationFn: handleCreateBlog,
        onSuccess: () => {
            message.success("Blog created successfully!");
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.GET_ALL_INSTRUCTOR_BLOGS,
                    QUERY_KEYS.GET_ALL_BLOGS,
                ],
            });
        },
        onError: (error) => {
            message.error(error.message || "Failed to create blog");
        },
    });

    return { createBlog, isCreatingBlog };
}
