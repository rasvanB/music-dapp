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
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../utils/store";
import { getUserData, setBearerToken } from "../services/users";
import { decode, JwtPayload } from "jsonwebtoken";

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
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user) {
      const tokenAsJson = window.localStorage.getItem("auth:user");
      if (tokenAsJson) {
        const token = JSON.parse(tokenAsJson);
        if (token) {
          setBearerToken(token);
          const decodedData = decode(token) as JwtPayload | null;
          if (
            decodedData &&
            decodedData.exp &&
            decodedData.publicAddress &&
            Date.now() < decodedData.exp * 1000
          ) {
            getUserData(decodedData.publicAddress).then((user) => {
              if (user) setUser(user);
            });
          } else window.localStorage.removeItem("auth:user");
        }
      } else setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
