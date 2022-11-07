// @ts-check
import { z } from "zod";

export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
});

export const clientEnv = {
  NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
};
