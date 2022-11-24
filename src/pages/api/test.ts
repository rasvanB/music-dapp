import { NextApiRequest, NextApiResponse } from "next";
import getMetadata from "../../utils/metadata";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getMetadata();
  return res.status(200).json({ test: "test" });
}
