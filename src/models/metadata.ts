import { z } from "zod";

export const metadataObject = z.object({
  format: z.object({
    bitrate: z.number(),
    duration: z.number(),
  }),
  common: z.object({
    title: z.string(),
    artists: z.array(z.string()),
    genre: z.array(z.string()),
    date: z.string(),
  }),
});
