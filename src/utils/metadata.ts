import { parseFile } from "music-metadata";

const PATH = "C:/Users/fakes/Desktop/test2.mp3";

const getMetadata = async () => {
  try {
    const metadata = await parseFile(PATH);
    console.log(metadata);
  } catch (error) {
    console.error(error);
  }
};

export default getMetadata;
