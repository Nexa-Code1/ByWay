import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleUpdateLesson } from "@/api/courseSectionLessons/courseSectionLessons";
import type { ICourseLessonUpdatedData } from "@/types";
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
            updatedLesson: ICourseLessonUpdatedData;
        }) => handleUpdateLesson(courseId, sectionId, lessonId, updatedLesson),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_LESSON_BY_ID],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_FIRST_INCOMPLETE_LESSON],
            });
        },
        onError: () => message.error("Cannot update course lesson"),
    });

    return { updateLesson, isUpdatingLesson };
}
