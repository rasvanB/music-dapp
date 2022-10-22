import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createClient } from "wagmi";

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const client = createClient({
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
