import makeBlockie from "ethereum-blockies-base64";

export const generateIcon = (hash: string) => {
  const data = makeBlockie(hash);
  return data;
};
