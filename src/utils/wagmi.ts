import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connector } from "wagmi";

type connectors = "metamask" | "coinbase" | "walletconnect";

export const getConnector = (connectorName: connectors): Connector => {
  switch (connectorName) {
    case "metamask":
      return new MetaMaskConnector();
    case "coinbase":
      return new CoinbaseWalletConnector({ options: { appName: "test.sh" } });
    case "walletconnect":
      return new WalletConnectConnector({ options: { qrcode: true } });
  }
};
