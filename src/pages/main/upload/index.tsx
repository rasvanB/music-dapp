import { NextPage } from "next";
import { getMetadataFromFile } from "../../../utils/getMetadata";
import ipfs from "../../../utils/ipfs/client";

const Upload: NextPage = () => {
  const updateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const metadata = await getMetadataFromFile(file);
        const result = await ipfs.add(file);
        // DISPLAY METADATA AND IPFS HASH
      } catch (error) {
        // ALERT COMPONENT UPDATE HERE
      }
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      {/*TODO: JSMEDIATAGS ONLY SUPPORTS MP3, SHOULD ADD SUPPORT FOR FLAC TOO */}
      <input type="file" accept="audio/mp3" onChange={updateHandler} />
    </div>
  );
};

export default Upload;
