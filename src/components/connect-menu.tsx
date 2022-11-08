import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRef, useState } from "react";
import { Connector, useConnect, useSignMessage } from "wagmi";
import {
  authUser,
  createUser,
  getUserBasicData,
  setBearerToken,
} from "../services/users";
import { userAtom } from "../utils/store";
import Alert, { AlertInfo, AlertType } from "./alert";

type MenuOptionProps = {
  connector: Connector;
  isLoading: boolean;
} & React.ComponentPropsWithoutRef<"div">;

const ConnectMenuOption = ({
  connector,
  isLoading,
  onClick,
}: MenuOptionProps) => {
  return (
    <div
      className={clsx(
        "mt-1 flex items-center rounded-md p-1.5 hover:bg-[#222429] hover:outline hover:outline-1 hover:outline-[#2f3238]",
        isLoading ? "cursor-default" : "cursor-pointer"
      )}
      onClick={onClick}
    >
      <Image
        src={`https://res.cloudinary.com/dm6lj1rcn/image/upload/v1667672062/${connector.id.toLowerCase()}.png`}
        alt="wallet logo"
        width="40px"
        height="40px"
      />
      <div className="w-full pl-3 font-inter text-sm font-semibold text-gray-300">
        {isLoading ? (
          <span className="flex w-full items-center gap-3 text-sm">
            {"Connecting..."}
            <Icon icon="eos-icons:loading" className="text-2xl"></Icon>
          </span>
        ) : (
          connector.name
        )}
      </div>
    </div>
  );
};

type ConnectMenuProps = {
  closeModal: () => void;
  connectors: Connector[];
};

const ConnectMenu = ({ closeModal, connectors }: ConnectMenuProps) => {
  const address = useRef<string>("");
  const [alert, setAlert] = useState<AlertInfo>({ message: "", type: "error" });
  const [, setUser] = useAtom(userAtom);

  const showAlert = (message: string, type: AlertType) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert({ message: "", type: "error" });
    }, 5000);
  };

  const { signMessage } = useSignMessage({
    onSuccess: async (data) => {
      // Verify signature when sign message succeeds
      if (address.current) {
        const authData = await authUser(address.current, data);
        if (authData) {
          localStorage.setItem("auth:user", JSON.stringify(authData.token));
          setBearerToken(authData.token);
          setUser(authData.user);
        }
      }
      closeModal();
    },
    onError(error) {
      showAlert("Message signing failed", "error");
      console.error("Singing", error);
    },
  });

  const { connect, pendingConnector, isLoading } = useConnect({
    onSuccess: async (data) => {
      showAlert("Prompting message sign", "info");
      try {
        const user = await getUserBasicData(data.account);

        if (user) {
          address.current = user.address;
          signMessage({ message: user.nonce });
        }
      } catch (error) {
        const createdUser = await createUser({
          address: data.account,
          nonce: crypto.randomUUID(),
        });
        address.current = createdUser.address;
        signMessage({ message: createdUser.nonce });
      }
    },
    onError(error) {
      showAlert(error.message, "error");
    },
  });

  return (
    <div>
      <div className={clsx(alert.message && "mb-3")}>
        {connectors.map((connector) => (
          <ConnectMenuOption
            key={connector.id}
            connector={connector}
            isLoading={isLoading && connector.id === pendingConnector?.id}
            onClick={() => {
              if (!isLoading) {
                connect({ connector });
              }
            }}
          />
        ))}
      </div>
      <Alert message={alert.message} type={alert.type} />
    </div>
  );
};
export default ConnectMenu;
