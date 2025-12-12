import { Cookies } from "react-cookie";

const cookies = new Cookies();

// Get tokens from cookies
export const getAccessToken = () => cookies.get("accessToken");
export const getRefreshToken = () => cookies.get("refreshToken");

// Set tokens in cookies
export const setTokens = ({
    accessToken,
    refreshToken,
}: {
    accessToken: string;
    refreshToken: string;
}) => {
    if (accessToken)
        cookies.set("accessToken", accessToken, {
            path: "/",
            // secure: true,
            sameSite: "lax",
        });

    if (refreshToken)
        cookies.set("refreshToken", refreshToken, {
            path: "/",
            // secure: true,
            sameSite: "lax",
        });
};

// Remove tokens
export const removeTokens = () => {
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
};
