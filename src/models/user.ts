import { z } from "zod";

export const userCreation = z.object({
  address: z.string(),
  nonce: z.string(),
});
