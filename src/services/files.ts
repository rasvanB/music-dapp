import axios from "axios";
import { Metadata } from "../models/metadata";

export const getMetadataFromFile = async (file: File): Promise<Metadata> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post("/api/test", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
