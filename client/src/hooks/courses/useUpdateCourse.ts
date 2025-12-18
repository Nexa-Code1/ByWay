import { useMutation } from "@tanstack/react-query";

import { handleUpdateCourse } from "@/api/courses/courses";
import type { ICourseDataBasicInfo } from "@/types";
import { message } from "antd";

export function useUpdateCourse() {
    const { mutate: updateCourse, isPending: isUpdatingCourse } = useMutation({
        mutationFn: async ({
            courseId,
            updatedCourseData,
        }: {
            courseId: string;
            updatedCourseData: ICourseDataBasicInfo;
        }) => {
            return handleUpdateCourse(courseId, updatedCourseData);
        },
        onSuccess: () => message.success("Course updated successfully!"),
        onError: () =>
            message.error("Something went wrong. Cannot update course."),
    });

    return { updateCourse, isUpdatingCourse };
}
