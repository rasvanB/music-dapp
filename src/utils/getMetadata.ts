import { parseFile } from "music-metadata";
import { ZodError } from "zod";
import { Metadata, metadataObject } from "../models/metadata";

const PATH = "C:/Users/fakes/Desktop/test2.mp3";
const BYTES_TO_MB_RATIO = 2 ** 20;
const SIZE_LIMIT = 10; // MB
// calculate bytes to mb conversion

const getMetadata = async (): Promise<Metadata> => {
  try {
    const metadata = await parseFile(PATH);
    const data: Metadata = metadataObject.parse(metadata);
    const sizeInMB =
      ((data.format.bitrate / 8) * data.format.duration) / BYTES_TO_MB_RATIO;
    if (sizeInMB <= SIZE_LIMIT) {
      return data;
    } else throw new Error("File is too big");
  } catch (error) {
    if (error instanceof ZodError) {
      if (error.issues[0]) {
        throw new Error(error.issues[0].message);
      } else throw new Error("Error parsing metadata");
    }
    throw error;
  }
};

export default getMetadata;
