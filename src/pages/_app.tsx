import type { AppType } from "next/dist/shared/lib/utils";
import { publicProvider } from "wagmi/providers/public";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { env } from "../env/client.mjs";
import { userAtom } from "../utils/store";
import { getUserData, setBearerToken } from "../services/users";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { decode, JwtPayload } from "jsonwebtoken";
import "../styles/globals.css";

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
    // If there is no user, proceed to retrieve the token from local storage
    if (!user) {
      // Retrieve the auth:user item from local storage
      const tokenAsJson = window.localStorage.getItem("auth:user");

      // If the item exists, parse it to get the token value
      if (tokenAsJson) {
        const token = JSON.parse(tokenAsJson);

        // If the token value is truthy, set the bearer token and decode the token
        if (token) {
          setBearerToken(token);
          const decodedData = decode(token) as JwtPayload | null;

          // If the decoded data is valid and the token has not expired, get the user data
          if (
            decodedData &&
            decodedData.exp &&
            decodedData.publicAddress &&
            Date.now() < decodedData.exp * 1000
          ) {
            getUserData(decodedData.publicAddress as string).then((user) => {
              // If the user data is truthy, set the user
              if (user) setUser(user);
            });
          }
          // If the decoded data is invalid or the token has expired, remove the auth:user item from local storage
          else window.localStorage.removeItem("auth:user");
        }
      }
      // If the auth:user item does not exist, set the user to null
      else setUser(null);
    }
    // Tell React to only run the effect when the component mounts and not re-run it on subsequent updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
