import { Metadata, metadataObject } from "../models/metadata";
import { read } from "jsmediatags";
import { ZodError } from "zod";

export const getMetadataFromFile = async (file: File): Promise<Metadata> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("File read timed out"));
    }, 4000);
    read(file, {
      onSuccess: (tag) => {
        try {
          const data: Metadata = metadataObject.parse(tag.tags);
          resolve(data);
        } catch (error) {
          if (error instanceof ZodError && error.issues[0]) {
            reject(new Error(error.issues[0].message));
          } else {
            reject(new Error("Invalid metadata"));
          }
        }
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
};
