import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleDeleteBlog } from "@/api/blogs/blogs";

export function useDeleteBlog() {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteBlog, isPending: isDeletingBlog } = useMutation({
        mutationFn: handleDeleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.GET_ALL_INSTRUCTOR_BLOGS,
                    QUERY_KEYS.GET_ALL_BLOGS,
                ],
            });
        },
    });

    return { deleteBlog, isDeletingBlog };
}
