import { NextPage } from "next";
import { getMetadataFromFile } from "../../../utils/getMetadata";

const Upload: NextPage = () => {
  const updateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const metadata = await getMetadataFromFile(file);
        console.log(metadata);
      } catch (error) {
        // TODO: HANDLE TAG READER ERRORS
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" accept=".mp3" onChange={updateHandler} />
    </div>
  );
};

export default Upload;
