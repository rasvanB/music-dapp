import type { NextPage } from "next";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  if (isConnected) return <div>Connected to {ensName ?? address}</div>;
  return (
    <div className="relative">
      <button
        onClick={() => setModalOpen(true)}
        className="rounded-md bg-purple-600 p-2 px-4 font-bold text-white"
      >
        Connect Wallet
      </button>
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <ConnectMenu />
        </Modal>
      )}
    </div>
  );
};

export default Home;
