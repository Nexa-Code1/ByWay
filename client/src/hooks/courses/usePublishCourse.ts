import { useMutation } from "@tanstack/react-query";

import { handlePublishCourse } from "@/api/courses/courses";
import { message } from "antd";

export function usePublishCourse() {
    const { mutateAsync: publishCourse, isPending: isPublishingCourse } =
        useMutation({
            mutationFn: async ({ courseId }: { courseId: string }) =>
                handlePublishCourse(courseId),
            onSuccess: () => message.success("Course published successfully!"),
            onError: () =>
                message.error("Something went wrong. Cannot publish course."),
        });

    return { publishCourse, isPublishingCourse };
}
