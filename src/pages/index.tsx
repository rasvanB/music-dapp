import type { NextPage } from "next";
import { useState } from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
// import { useEnsAvatar } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";
import button from "../styles/buttons";

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connectors } = useConnect();

  // TODO: SET UP AVATARS
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="relative flex h-[100vh] items-center justify-center bg-dark font-inter text-white ">
      {isConnected ? (
        <div>Connected to {ensName ?? address}</div>
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
