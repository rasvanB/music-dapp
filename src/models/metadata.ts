import { z } from "zod";

export const maxSeconds = 60 * 30; // 30 minutes

export const metadataObject = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  artist: z.string({
    required_error: "Artist is required",
    invalid_type_error: "Artist must be a string",
  }),
  genre: z.string({
    required_error: "Genre is required",
    invalid_type_error: "Genre must be a string",
  }),
  year: z.string({
    required_error: "Year is required",
    invalid_type_error: "Year must be a string",
  }),
});

export type Metadata = z.infer<typeof metadataObject>;
