import { Metadata, metadataObject } from "../models/metadata";
import { read } from "jsmediatags";
import { ZodError } from "zod";
import Result from "../types/result";

export const getMetadataFromFile = async (
  file: File
): Promise<Result<Metadata, Error>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ result: "error", error: new Error("Timeout") });
    }, 2000);
    read(file, {
      onSuccess: (tag) => {
        try {
          const data: Metadata = metadataObject.parse(tag.tags);
          resolve({ result: "success", value: data });
        } catch (error) {
          if (error instanceof ZodError && error.issues[0]) {
            reject({
              result: "error",
              error: new Error(error.issues[0].message),
            });
          } else {
            reject(new Error("Invalid metadata"));
          }
        }
      },
      onError: (error) => {
        reject({
          result: "error",
          error: new Error(error.info),
        });
      },
    });
  });
};
