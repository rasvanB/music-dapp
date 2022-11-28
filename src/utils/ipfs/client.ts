import { create } from "ipfs-http-client";
import { IPFSHTTPClient } from "ipfs-http-client/dist/src/types.js";
import { env } from "../../env/client.mjs";

const projectId = env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = env.NEXT_PUBLIC_INFURA_API_KEY;
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs: IPFSHTTPClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization,
  },
});

export default ipfs;
