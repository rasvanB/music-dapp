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
  return await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, _, files) {
      if (err) return reject(err);
      resolve({ files });
    });
  });
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await parseForm(req);
  console.log(data);
  return res.status(200).json({ data });
}
