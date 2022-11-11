import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useState } from "react";
import { useConnect } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";
import button from "../styles/buttons";
import Image from "next/image";
import { generateIcon } from "../utils/identicon";
import { userAtom } from "../utils/store";

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { connectors } = useConnect();
  const [user] = useAtom(userAtom);
  return (
    <div className="relative flex h-[100vh] items-center justify-center bg-dark font-inter text-white ">
      {user ? (
        <div>
          Connected to {user.address}
          <Image
            src={"data:image/svg+xml;base64," + generateIcon(user.address)}
            width={50}
            height={50}
            alt="profile_picture"
          ></Image>
        </div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className={button({ intent: "primary" })}
        >
          Connect Wallet
        </button>
      )}
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen} title="Connect with Wallet">
          <ConnectMenu
            connectors={connectors}
            closeModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
