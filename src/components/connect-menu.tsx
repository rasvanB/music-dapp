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
      className="mt-3 flex cursor-pointer items-center"
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
      <div className="pl-3 font-semibold tracking-wider text-gray-200">
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
