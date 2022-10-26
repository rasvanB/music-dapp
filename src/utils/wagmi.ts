import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connector } from "wagmi";

type ConnectorName = "metamask" | "coinbase" | "walletconnect";

export type ConnectorType = {
  name: ConnectorName;
  label: string;
};

export const getConnector = (connector: ConnectorType): Connector => {
  switch (connector.name) {
    case "metamask":
      return new MetaMaskConnector();
    case "coinbase":
      return new CoinbaseWalletConnector({ options: { appName: "test.sh" } });
    case "walletconnect":
      return new WalletConnectConnector({ options: { qrcode: true } });
  }
};
