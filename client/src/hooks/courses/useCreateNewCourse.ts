import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleCreateNewCourse } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useCreateNewCourse() {
    const queryClient = useQueryClient();

    const { mutateAsync: createNewCourse, isPending: isCreatingNewCourse } =
        useMutation({
            mutationFn: async (courseData: FormData) => {
                return handleCreateNewCourse(courseData);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_INSTRUCTOR_COURSES],
                });
                message.success("Course created successfully!");
            },
            onError: () => {
                message.error("Something went wrong. Cannot create course.");
            },
        });

    return { createNewCourse, isCreatingNewCourse };
}
