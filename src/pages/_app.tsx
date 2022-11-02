import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createClient } from "wagmi";
import { defaultChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { env } from "../env/client.mjs";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
  alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
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
