import { z } from "zod";

export const maxSeconds = 60 * 30; // 30 minutes

const errorMessages = (field: string) => ({
  required_error: `${field} is required`,
  invalid_type_error: `${field} must be a string`,
});

export const metadataObject = z.object({
  title: z.string(errorMessages("Title")),
  artist: z.string(errorMessages("Artist")),
  genre: z.string(errorMessages("Genre")),
  year: z.string(errorMessages("Year")),
});

export type Metadata = z.infer<typeof metadataObject>;
