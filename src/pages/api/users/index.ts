import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { userCreation } from "../../../models/user";
import { prisma } from "../../../server/db/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const user = userCreation.parse(req.body);
        const createdUser = await prisma.user.create({ data: user });
        return res.status(201).json(createdUser);
      case "PUT":
        const userData = userCreation.parse(req.body);
        const updatedUser = await prisma.user.update({
          where: { address: userData.address },
          data: userData,
        });
        return res.status(201).json(updatedUser);
      default:
        return res.status(404).json({ message: "Method not supported" });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return res.status(400).json({ error: "invalid data" });
    else console.error(error);
  }
}
