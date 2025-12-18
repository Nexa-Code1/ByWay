import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleCreateCourseSection } from "@/api/courseSections/courseSections";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useCreateCourseSection() {
    const queryClient = useQueryClient();

    const { mutate: createCourseSection, isPending: isCreatingCourseSection } =
        useMutation({
            mutationFn: async ({
                courseId,
                section,
            }: {
                courseId: string;
                section: string;
            }) => await handleCreateCourseSection(section, courseId),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_COURSE_DETAILS],
                });
                message.success("New section was created successfully");
            },
            onError: () =>
                message.error(
                    "Something went wrong. Cannot create new section."
                ),
        });

    return { createCourseSection, isCreatingCourseSection };
}
