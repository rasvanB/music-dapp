import { NextApiRequest } from "next";

export const getBearerToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      const [, token] = authHeader.split(" ");
      return token;
    }
  }
};
