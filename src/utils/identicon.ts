import Identicon, { IdenticonOptions } from "identicon.js";

const IMAGE_OPTIONS: IdenticonOptions = {
  background: [24, 25, 34, 255],
  size: 128,
};
export const generateIcon = (token: string) => {
  const data = new Identicon(token, IMAGE_OPTIONS).toString();
  return data;
};
