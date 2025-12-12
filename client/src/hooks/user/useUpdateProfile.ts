import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleUpdateProfile, handleUploadProfileImg } from "@/api/user/user";
import type { IUpdateProfile } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: async ({
            updatedValues,
            file,
        }: {
            updatedValues: IUpdateProfile;
            file: File | null;
        }) => {
            await handleUpdateProfile(updatedValues);
            await handleUploadProfileImg(file);
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
                type: "active",
                exact: true,
            });
            message.success("Profile updated successfully");
        },
        onError: () =>
            message.error(
                "Something went error cannot update profile. Please try again later."
            ),
    });

    return { updateProfile, isPending };
}
