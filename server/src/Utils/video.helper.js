import ffmpeg from "fluent-ffmpeg";
import ffprobePath from "ffprobe-static";

ffmpeg.setFfprobePath(ffprobePath.path);

export const getLocalVideoDuration = (filePath) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(Math.round(metadata.format.duration || 0));
    });
  });
