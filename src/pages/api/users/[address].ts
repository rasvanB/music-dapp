import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.query.address as string;

  const user = await prisma.user.findUnique({
    where: { address },
  });

  if (user) {
    res.status(200).json({ address: user.address, nonce: user.nonce });
  } else {
    res.status(404).json({ message: "User not found" });
  }
}
