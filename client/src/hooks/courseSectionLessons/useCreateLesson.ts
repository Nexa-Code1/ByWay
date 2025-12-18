import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleCreateLesson } from "@/api/courseSectionLessons/courseSectionLessons";
import type { ICourseLessonData } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useCreateLesson() {
    const queryClient = useQueryClient();

    const { mutate: createLesson, isPending: isCreatingLesson } = useMutation({
        mutationFn: async ({
            courseId,
            sectionId,
            lessonData,
        }: {
            courseId: string;
            sectionId: string;
            lessonData: ICourseLessonData;
        }) => await handleCreateLesson(courseId, sectionId, lessonData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
            });
            message.success("New lesson was created successfully");
        },
        onError: () =>
            message.error("Something went wrong. Cannot create new lesson."),
    });

    return { createLesson, isCreatingLesson };
}
