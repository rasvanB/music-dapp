import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  res.status(200).json({ message: address });
};

export default handler;
