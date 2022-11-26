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
  TDAT: z.object(
    {
      id: z.string(),
      data: z.string().refine(
        (data) => {
          const date = new Date(data);
          return date instanceof Date && !isNaN(date.getTime());
        },
        {
          message: "Date is invalid",
        }
      ),
    },
    {
      required_error: "Date is required",
      invalid_type_error: "Date must be a string in the format YYYY-MM-DD",
    }
  ),
});

export type Metadata = z.infer<typeof metadataObject>;
