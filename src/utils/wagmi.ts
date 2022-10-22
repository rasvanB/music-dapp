import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connector } from "wagmi";

type connectors = "injected" | "metamask" | "coinbase" | "walletconnect";

export const getConnector = (connectorName: connectors): Connector => {
  switch (connectorName) {
    case "injected":
      return new InjectedConnector();
    case "metamask":
      return new MetaMaskConnector();
    case "coinbase":
      return new CoinbaseWalletConnector({ options: { appName: "test.sh" } });
    case "walletconnect":
      return new WalletConnectConnector({ options: { qrcode: true } });
  }
};
