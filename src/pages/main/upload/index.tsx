import { NextPage } from "next";
import { useState } from "react";
import { Metadata } from "../../../models/metadata";
import { getMetadataFromFile } from "../../../utils/getMetadata";
import { uploadFile } from "../../../utils/ipfs/files";

const Upload: NextPage = () => {
  const [metadata, setMetadata] = useState<Metadata>();

  const updateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const metadata = await getMetadataFromFile(file);
        const path = await uploadFile(file);
        setMetadata(metadata);
        if (path.result === "success") {
          console.log(path.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" accept="audio/mp3" onChange={updateHandler} />
      <section>
        <h2>Metadata</h2>
        {metadata ? (
          <ul>
            {Object.entries(metadata).map(([key, value]) => (
              <li key={key}>{`${key} ${value}`}</li>
            ))}
          </ul>
        ) : (
          <p>No metadata available</p>
        )}
      </section>
    </div>
  );
};

export default Upload;
