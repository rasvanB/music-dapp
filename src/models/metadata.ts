import { z } from "zod";

export const maxSeconds = 60 * 30; // 30 minutes

export const metadataObject = z.object({
  format: z.object({
    bitrate: z.number({
      required_error: "Bitrate is required",
    }),
    duration: z
      .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
      })
      .positive()
      .refine(
        (arg) => {
          return arg <= maxSeconds;
        },
        {
          message: `Duration must be less than ${maxSeconds} seconds`,
        }
      ),
  }),
  common: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    artist: z.string({
      required_error: "Artist is required",
    }),
    genre: z
      .array(z.string({}), {
        required_error: "Genre is required",
      })
      .nonempty(),
    year: z.number({
      required_error: "Year is required",
    }),
  }),
});

export type Metadata = z.infer<typeof metadataObject>;
