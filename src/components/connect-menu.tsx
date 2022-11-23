import clsx from "clsx";
import { useAtom } from "jotai";
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
import ConnectMenuOption from "./connect-menu-option";

type ConnectMenuProps = {
  closeModal: () => void;
  connectors: Connector[];
};

const ConnectMenu = ({ closeModal, connectors }: ConnectMenuProps) => {
  const address = useRef<string>("");
  const [alert, setAlert] = useState<AlertInfo>({ message: "", type: "error" });
  const [, setUser] = useAtom(userAtom);

  const showAlert = (message: string, type: AlertType, timeout: number) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert({ message: "", type: "error" });
    }, timeout);
  };

  const { signMessage } = useSignMessage({
    onSuccess: async (data) => {
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
      showAlert("Message signing failed", "error", 5000);
      console.error("Singing", error);
    },
  });

  const { connect, pendingConnector, isLoading } = useConnect({
    onSuccess: async (data) => {
      showAlert("Prompting message sign", "info", 5000);
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
        if (createdUser) {
          address.current = createdUser.address;
          signMessage({ message: createdUser.nonce });
        }
      }
    },
    onError(error) {
      showAlert(error.message, "error", 5000);
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
