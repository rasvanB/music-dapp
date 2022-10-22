type MenuOptionProps = {
  text: string;
};

const ConnectMenuOption = ({ text }: MenuOptionProps) => {
  const connectorName =
    text === "metamask"
      ? "MetaMask"
      : text === "coinbase"
      ? "Coinbase"
      : text === "walletconnect"
      ? "WalletConnect"
      : "";
  return <div>{connectorName}</div>;
};

const ConnectMenu = () => {
  const connectOptions = ["metamask", "coinbase", "walletconnect"];
  return (
    <div>
      {connectOptions.map((option) => (
        <ConnectMenuOption key={option} text={option} />
      ))}
    </div>
  );
};
export default ConnectMenu;
