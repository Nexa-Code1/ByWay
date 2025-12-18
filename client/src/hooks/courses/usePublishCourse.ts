import { useMutation } from "@tanstack/react-query";

import { handlePublishCourse } from "@/api/courses/courses";
import { message } from "antd";

export function usePublishCourse() {
    const { mutate: publishCourse, isPending: isPublishingCourse } =
        useMutation({
            mutationFn: async ({ courseId }: { courseId: string }) => {
                return handlePublishCourse(courseId);
            },
            onSuccess: () => message.success("Course updated successfully!"),
            onError: () =>
                message.error("Something went wrong. Cannot update course."),
        });

    return { publishCourse, isPublishingCourse };
}
