import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createClient } from "wagmi";
import { defaultChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { env } from "../env/client.mjs";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
  alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
]);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
