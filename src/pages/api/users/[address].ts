import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getBearerToken, isJwtValid } from "../../../utils/token";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = getBearerToken(req);
    const address = req.query.address as string;

    const user = await prisma.user.findUnique({
      where: { address },
    });

    if (user) {
      if (!token) {
        return res
          .status(200)
          .json({ address: user.address, nonce: user.nonce });
      } else {
        if (isJwtValid(token)) return res.status(200).json(user);
        return res.status(401).json({ error: "Invalid token" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(404).json({ error: "method not supported" });
  }
}
