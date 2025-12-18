import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleUpdateCourseSection } from "@/api/courseSections/courseSections";
import { message } from "antd";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateCourseSection() {
    const queryClient = useQueryClient();

    const { mutate: updateCourseSection, isPending: isUpdatingCourseSection } =
        useMutation({
            mutationFn: async ({
                courseId,
                sectionId,
                section,
            }: {
                courseId: string;
                sectionId: string;
                section: string;
            }) => {
                if (!courseId) return;
                return handleUpdateCourseSection(courseId, sectionId, section);
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.GET_COURSE_DETAILS,
                        variables.courseId,
                    ],
                });
                message.success("Course section updated successfully.");
            },
            onError: () => message.error("Cannot update course section"),
        });

    return { updateCourseSection, isUpdatingCourseSection };
}
