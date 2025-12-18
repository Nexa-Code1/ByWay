import { message } from "antd";
import { useMutation } from "@tanstack/react-query";

import { handleDeleteCourse } from "@/api/courses/courses";

export function useDeleteCourse() {
    const { mutateAsync: deleteCourse, isPending: isDeletingCourse } =
        useMutation({
            mutationFn: async (courseId: string) => {
                return handleDeleteCourse(courseId);
            },
            onSuccess: () => message.success("Course deleted successfullly.!"),
            onError: () =>
                message.error("Something went wrong. Cannot delete course."),
        });

    return { deleteCourse, isDeletingCourse };
}
