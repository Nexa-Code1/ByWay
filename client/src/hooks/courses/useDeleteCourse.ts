import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleDeleteCourse } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useDeleteCourse() {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteCourse, isPending: isDeletingCourse } =
        useMutation({
            mutationFn: async (courseId: string) => {
                return handleDeleteCourse(courseId);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_INSTRUCTOR_COURSES],
                });
                message.success("Course deleted successfullly.!");
            },
            onError: () =>
                message.error("Something went wrong. Cannot delete course."),
        });

    return { deleteCourse, isDeletingCourse };
}
