import type { NextPage } from "next";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { getConnector } from "../utils/wagmi";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: getConnector("walletconnect"),
  });

  if (isConnected) return <div>Connected to {ensName ?? address}</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Home;
