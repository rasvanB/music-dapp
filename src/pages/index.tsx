import type { NextPage } from "next";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";
// import { useEnsAvatar } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";
import { ConnectorType } from "../utils/wagmi";

const connectOptions: ConnectorType[] = [
  {
    name: "metamask",
    label: "MetaMask",
  },
  {
    name: "coinbase",
    label: "Coinbase Wallet",
  },
  {
    name: "walletconnect",
    label: "WalletConnect",
  },
];

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  // TODO: SET UP AVATARS
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="relative flex h-[100vh] items-center justify-center bg-dark font-roboto text-white ">
      {isConnected ? (
        <div>Connected to {ensName ?? address}</div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="h-fit select-none rounded-full bg-purple p-2 px-6 font-bold"
        >
          Connect Wallet
        </button>
      )}
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen} title="Connect with Wallet">
          <ConnectMenu
            options={connectOptions}
            closeModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
