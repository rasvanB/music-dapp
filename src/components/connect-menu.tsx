import Image from "next/image";
import { useConnect } from "wagmi";
import { connectors, getConnector } from "../utils/wagmi";

type MenuOptionProps = {
  text: connectors;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const ConnectMenuOption = ({ text, onClick }: MenuOptionProps) => {
  const { connect } = useConnect({ connector: getConnector(text) });
  const connectorName =
    text === "metamask"
      ? "MetaMask"
      : text === "coinbase"
      ? "Coinbase Wallet"
      : text === "walletconnect"
      ? "WalletConnect"
      : "";
  return (
    <div
      className="mt-1 flex cursor-pointer items-center rounded-md p-2 hover:bg-[#222429] hover:outline hover:outline-1 hover:outline-[#2f3238]"
      onClick={(event) => {
        connect();
        if (onClick) onClick(event);
      }}
    >
      <Image
        src={`/${text}.png`}
        alt="wallet logo"
        width="35px"
        height="35px"
      ></Image>
      <div className="pl-3 font-medium tracking-wider text-gray-300">
        {connectorName}
      </div>
    </div>
  );
};

type ConnectMenuProps = {
  closeModal: () => void;
};

const ConnectMenu = ({ closeModal }: ConnectMenuProps) => {
  console.log();

  const connectOptions = ["metamask", "coinbase", "walletconnect"] as const;
  return (
    <div>
      {connectOptions.map((option) => (
        <ConnectMenuOption key={option} text={option} onClick={closeModal} />
      ))}
    </div>
  );
};
export default ConnectMenu;
