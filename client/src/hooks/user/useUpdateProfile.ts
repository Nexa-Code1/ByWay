import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCookies } from "react-cookie";

import { handleUpdateProfile, handleUploadProfileImg } from "@/api/user/user";
import type { IUpdateProfile } from "@/types";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const [cookies] = useCookies(["token"]);
    const { token } = cookies;

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: async ({
            updatedValues,
            file,
        }: {
            updatedValues: IUpdateProfile;
            file: File | null;
        }) => {
            handleUpdateProfile(token, updatedValues);
            handleUploadProfileImg(token, file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
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
