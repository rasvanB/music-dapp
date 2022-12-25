import ipfs from "./client";

export const uploadFile = async (file: File) => {
  // TODO: encrypt file
  const { path } = await ipfs.add(file);
  return path;
};

export const downloadFile = async (path: string) => {
  const file = await ipfs.get(path);
  // TODO: decrypt file
  return file;
};
