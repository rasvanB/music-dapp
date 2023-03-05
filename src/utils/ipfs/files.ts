import Result from "../../types/result";
import ipfs from "./client";

export const uploadFile = async (
  file: File
): Promise<Result<string, Error>> => {
  if (file.size > 5 * 1024 * 1024) {
    return { result: "error", error: new Error("File too big, max 5MB") };
  } else {
    const { path } = await ipfs.add(file);
    return { result: "success", value: path };
  }
};

export const downloadFile = async (path: string) => {
  const file = await ipfs.get(path);
  // TODO: decrypt file
  return file;
};

// CHUNKING LOGIC FOR SOME OTHER TIME
// const chunks = [];
// const chunkSize = 1024 * 1024;
// for (let i = 0; i < file.size; i += chunkSize) {
//   const chunk = file.slice(i, i + chunkSize);
//   chunks.push(chunk);
// }
// // upload chunks
// const chunkPaths = [];
// for (let i = 0; i < chunks.length; i++) {
//   const chunk = chunks[i]!;
//   const { path } = await ipfs.add(chunk);
//   chunkPaths.push(path);
// }
// // create manifest
// const manifest = {
//   name: file.name,
//   size: file.size,
//   type: file.type,
//   chunks: chunkPaths,
// };
// // upload manifest
// const { path } = await ipfs.add(JSON.stringify(manifest));
// return path;
