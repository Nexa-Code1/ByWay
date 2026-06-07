import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/queryKeys";
import { handleGetLessonById } from "@/api/courseSectionLessons/courseSectionLessons";

export function useGetLessonById(id?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_KEYS.GET_LESSON_BY_ID, id],
        queryFn: () => handleGetLessonById(id!),
        retry: false,
        enabled: !!id,
    });

    return { lesson: data?.lesson || null, isLoading, error };
}
