import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { userAuthentification } from "../../../models/user";
import { prisma } from "../../../server/db/client";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { env } from "../../../env/server.mjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const userData = userAuthentification.parse(req.body);
        const user = await prisma.user.findUnique({
          where: { address: userData.address },
        });
        if (user) {
          const { address, nonce } = user;
          const { signature } = userData;
          const publicAddress = verifyMessage(nonce, signature);
          if (address === publicAddress) {
            const newNonce = randomUUID();
            const updatedUser = await prisma.user.update({
              where: { address },
              data: {
                nonce: newNonce,
              },
            });
            const token = sign({ publicAddress }, env.SECRET, {
              algorithm: "HS256",
              expiresIn: "24h",
            });
            return res.status(201).json({ user: updatedUser, token });
          } else {
            return res.status(401).json({
              error: "Invalid signature",
            });
          }
        }
        return res.status(401).json({
          error: "User not found",
        });
      default:
        return res.status(404).json({ message: "Method not supported" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: "invalid data" });
    } else {
      console.error(error);
      res.status(404).end();
    }
  }
}
