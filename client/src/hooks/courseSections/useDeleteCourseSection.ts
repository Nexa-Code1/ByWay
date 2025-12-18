import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleDeleteCourseSection } from "@/api/courseSections/courseSections";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useDeleteCourseSection() {
    const queryClient = useQueryClient();

    const { mutate: deleteCourseSection, isPending: isDeletingCourseSection } =
        useMutation({
            mutationFn: async ({
                courseId,
                sectionId,
            }: {
                courseId: string;
                sectionId: string;
            }) => {
                if (!courseId) return;
                return handleDeleteCourseSection(courseId, sectionId);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
                });
                message.success("Course section deleted successfully.");
            },
            onError: () => message.error("Cannot delete course section"),
        });

    return { deleteCourseSection, isDeletingCourseSection };
}
