import { User } from "../utils/store";
import axios from "axios";
import { userCreation } from "../models/user";

type BasicUser = {
  address: string;
  nonce: string;
};

let bearerToken = "";

export const setBearerToken = (token: string) => {
  bearerToken = token;
};

export const getUserBasicData = async (address: string): Promise<BasicUser> => {
  const response = await axios
    .get<BasicUser>("/api/users/" + address)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  return response;
};

export const getUserData = async (address: string): Promise<User> => {
  const user = await axios
    .get<User>("/api/users/" + address, {
      headers: { Authorization: "Bearer " + bearerToken },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  return user;
};

export const createUser = async (user: User): Promise<User | undefined> => {
  try {
    const createdUser = await axios
      .post("/api/users/", user)
      .then((res) => res.data);
    return userCreation.parse(createdUser);
  } catch (error) {
    throw error;
  }
};

export const authUser = async (
  address: string,
  signature: string
): Promise<{ user: User; token: string } | undefined> => {
  try {
    const authentificatedUser = await axios
      .post("/api/auth", { address, signature })
      .then((res) => res.data);
    return authentificatedUser;
  } catch (error) {
    throw error;
  }
};
