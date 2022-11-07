import { User } from "@prisma/client";
import axios from "axios";
import { userCreation } from "../models/user";

export const getUser = async (address: string): Promise<User | undefined> => {
  try {
    const response = await axios
      .get("/api/users/" + address)
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const createUser = async (user: User): Promise<User> => {
  const createdUser = await axios
    .post("/api/users/", user)
    .then((res) => res.data);
  return userCreation.parse(createdUser);
};

type AuthData = {
  token: string;
  user: User;
};

export const authUser = async (
  address: string,
  signature: string
): Promise<AuthData | undefined> => {
  try {
    const authentificatedUser = await axios
      .post("/api/auth", { address, signature })
      .then((res) => res.data);
    return authentificatedUser;
  } catch (error) {
    throw error;
  }
};
