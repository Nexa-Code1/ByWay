import { useMutation } from "@tanstack/react-query";
import { handleBuyCourseIntent } from "@/api/payment/payment";
import type { IBuyCourseIntentOptions } from "@/types";

export function useBuyCourseIntent() {
    const { mutateAsync: buyCourseIntent, isPending: isCreatingIntent } =
        useMutation({
            mutationFn: async ({
                coursesIds,
                options,
            }: {
                coursesIds: string[];
                options: IBuyCourseIntentOptions;
            }) => handleBuyCourseIntent(coursesIds, options),
        });

    return { buyCourseIntent, isCreatingIntent };
}
