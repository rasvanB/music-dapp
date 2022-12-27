import ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";

export const convertToHLS = async (mp3File: File): Promise<string> => {
  // Create an HLS playlist file
  const mp3stream = fs.createReadStream(mp3File.name);

  const hlsPlaylist = await new Promise<string>((resolve, reject) => {
    ffmpeg(mp3stream)
      .outputOptions(["-hls_time 10", "-hls_list_size 0", "-f hls"])
      .on("end", () => {
        resolve(`${mp3File.name}.m3u8`);
      })
      .on("error", (error: Error) => {
        reject(error);
      })
      .save(`${mp3File.name}.m3u8`);
  });

  // Return the HLS playlist file

  console.log("HLS playlist file: ", hlsPlaylist);
  return hlsPlaylist;
};
