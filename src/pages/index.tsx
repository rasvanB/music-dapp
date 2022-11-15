import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useState } from "react";
import { useConnect } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";
import UserProfile from "../components/user-profile";
import button from "../styles/buttons";
import { userAtom } from "../utils/store";

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { connectors } = useConnect();
  const [user] = useAtom(userAtom);
  return (
    <div className="relative flex h-[100vh] items-start justify-center bg-dark pt-2 font-inter text-white">
      {user ? (
        <UserProfile />
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
