import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetFirstIncompleteLesson } from "@/api/courseSectionLessons/courseSectionLessons";

export function useGetFirstIncompleteLesson(courseId?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_KEYS.GET_FIRST_INCOMPLETE_LESSON, courseId],
        queryFn: () => handleGetFirstIncompleteLesson(courseId!),
        retry: false,
        enabled: !!courseId,
    });

    return { lesson: data?.lesson || null, isLoading, error };
}
