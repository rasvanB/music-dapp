import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getBearerToken } from "../../../utils/token";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getBearerToken(req);
  const address = req.query.address as string;

  const user = await prisma.user.findUnique({
    where: { address },
  });

  if (user) {
    if (!token) {
      res.status(200).json({ address: user.address, nonce: user.nonce });
    } else {
      res.status(200).json(user);
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
}
