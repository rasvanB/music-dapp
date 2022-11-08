import { atom } from "jotai";

export type User = {
  username?: string;
  address: string;
  nonce: string;
};

export const userAtom = atom<User | null>(null);
