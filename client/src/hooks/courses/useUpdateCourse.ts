import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleUpdateCourse } from "@/api/courses/courses";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateCourse() {
    const queryClient = useQueryClient();

    const { mutateAsync: updateCourse, isPending: isUpdatingCourse } =
        useMutation({
            mutationFn: async ({
                courseId,
                updatedCourseData,
            }: {
                courseId: string;
                updatedCourseData: FormData;
            }) => {
                return handleUpdateCourse(courseId, updatedCourseData);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_INSTRUCTOR_COURSES],
                    exact: false,
                });
                message.success("Course updated successfully!");
            },
            onError: () =>
                message.error("Something went wrong. Cannot update course."),
        });

    return { updateCourse, isUpdatingCourse };
}
