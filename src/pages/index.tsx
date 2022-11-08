import { useAtom } from "jotai";
import { decode, JwtPayload } from "jsonwebtoken";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import ConnectMenu from "../components/connect-menu";
import Modal from "../components/modal";
import { getUserData, setBearerToken } from "../services/users";
import button from "../styles/buttons";
import { userAtom } from "../utils/store";

const Home: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { connectors } = useConnect();
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
    <div className="relative flex h-[100vh] items-center justify-center bg-dark font-inter text-white ">
      {user ? (
        <div>Connected to {user.address} YO</div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className={button({ intent: "primary" })}
        >
          Connect Wallet
        </button>
      )}
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen} title="Connect with Wallet">
          <ConnectMenu
            connectors={connectors}
            closeModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
