import ffmpeg from "fluent-ffmpeg";
import ffprobe from "ffprobe-static";

ffmpeg.setFfprobePath(ffprobe.path);

export const getVideoDuration = (videoPath) => {
    return new Promise((resolve) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                console.error("Error getting video duration:", err);
                return resolve(0);
            }

            resolve(metadata?.format?.duration || 0);
        });
    });
};
