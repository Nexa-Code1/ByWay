import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleUpdateLesson } from "@/api/courseSectionLessons/courseSectionLessons";
import type { ICourseLessonData } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateLesson() {
    const queryClient = useQueryClient();

    const { mutate: updateLesson, isPending: isUpdatingLesson } = useMutation({
        mutationFn: async ({
            courseId,
            sectionId,
            lessonId,
            updatedLesson,
        }: {
            courseId: string;
            sectionId: string;
            lessonId: string;
            updatedLesson: ICourseLessonData;
        }) => handleUpdateLesson(courseId, sectionId, lessonId, updatedLesson),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
            });
            message.success("Course lesson updated successfully.");
        },
        onError: () => message.error("Cannot update course lesson"),
    });

    return { updateLesson, isUpdatingLesson };
}
