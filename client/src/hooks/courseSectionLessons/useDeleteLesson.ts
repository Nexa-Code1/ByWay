import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleDeleteLesson } from "@/api/courseSectionLessons/courseSectionLessons";

export function useDeleteLesson() {
    const queryClient = useQueryClient();

    const { mutate: deleteLesson, isPending: isDeletingLesson } = useMutation({
        mutationFn: async ({ lessonId }: { lessonId: string }) =>
            handleDeleteLesson(lessonId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
            });
            message.success("Course lesson deleted successfully.");
        },
        onError: () => message.error("Cannot delete course lesson"),
    });

    return { deleteLesson, isDeletingLesson };
}
