import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createClient } from "wagmi";
import { defaultChains } from "wagmi";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: false,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
