import { useMutation } from "@tanstack/react-query";

import { handleCreateNewCourse } from "@/api/courses/courses";
import type { ICourseDataBasicInfo } from "@/types";
import { message } from "antd";

export function useCreateNewCourse() {
    const { mutateAsync: createNewCourse, isPending: isCreatingNewCourse } =
        useMutation({
            mutationFn: async (courseData: ICourseDataBasicInfo) => {
                return handleCreateNewCourse(courseData);
            },
            onSuccess: () => message.success("Course created successfullly.!"),
            onError: () =>
                message.error("Something went wrong. Cannot create course."),
        });

    return { createNewCourse, isCreatingNewCourse };
}
