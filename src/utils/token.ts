import { NextApiRequest } from "next";
import * as jwt from "jsonwebtoken";
import { env } from "../env/server.mjs";

export const getBearerToken = (req: NextApiRequest): string | undefined => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      const [, token] = authHeader.split(" ");
      return token as string;
    }
  }
};

export const isJwtValid = (token: string): boolean => {
  try {
    jwt.verify(token, env.SECRET);
    return true;
  } catch (err) {
    return false;
  }
};
