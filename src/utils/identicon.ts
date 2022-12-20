import makeBlockie from "ethereum-blockies-base64";

export const generateIcon = (hash: string): string => {
  const data = makeBlockie(hash);
  return data;
};
