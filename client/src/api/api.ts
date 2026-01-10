import axios from "axios";

import {
    getAccessToken,
    getRefreshToken,
    setTokens,
    removeTokens,
} from "@/utils/tokenService";
import { handleRefreshToken } from "./auth/auth";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_BASE_URL || import.meta.env.VITE_DEFAULT_BASE_URL,
    withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 (expired token)
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                removeTokens();
                window.location.href = "/";
                return Promise.reject(error);
            }

            try {
                const data = await handleRefreshToken(refreshToken);

                setTokens({
                    accessToken: data.token,
                    refreshToken,
                });

                // Attach NEW accessToken to each requst
                originalRequest.headers.Authorization = `Bearer ${data.token}`;

                // retry the original request with the new token
                return api(originalRequest);
            } catch (refreshError) {
                removeTokens();
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
