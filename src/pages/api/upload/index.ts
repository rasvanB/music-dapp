import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ files: formidable.Files }> => {
  return await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, (err, _, files) => {
      if (err) return reject(err);
      resolve({ files });
    });
  });
};

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await parseForm(req);
  console.log(data);
  return res.status(200).json({ data });
};

export default handle;
