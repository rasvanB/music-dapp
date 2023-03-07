import makeBlockie from "ethereum-blockies-base64";

export const generateIcon = (hash: string): string => makeBlockie(hash);
