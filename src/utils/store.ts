import { atom } from "jotai";

type User = {
  username?: string;
  address: string;
  nonce: string;
};

export const userAtom = atom<User | null>(null);
