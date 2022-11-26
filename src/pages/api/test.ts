import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import getMetadata from "../../utils/getMetadata";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, _, files) {
    if (err) {
      return res.status(500).json({ error: "Error parsing file" });
    } else {
      if (files.file) {
        const file = files.file as formidable.File;
        try {
          const metadata = await getMetadata(file.filepath);
          return res.status(200).json(metadata);
        } catch (error) {
          return res.status(500).json({ error: (error as Error).message });
        }
      }
    }
  });
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await post(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
