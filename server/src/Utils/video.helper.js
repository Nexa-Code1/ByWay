import { getVideoDurationInSeconds } from "get-video-duration";

export const getVideoDuration = async (videoPath) => {
    try {
        const duration = await getVideoDurationInSeconds(videoPath);
        return duration;
    } catch (error) {
        console.error("Error getting video duration:", error);
        return 0;
    }
};
