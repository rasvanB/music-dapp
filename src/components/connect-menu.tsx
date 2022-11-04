import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Connector, useConnect } from "wagmi";
import Alert, { AlertInfo } from "./alert";

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
        src={`/${connector.id}.png`}
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
  const [error, setError] = useState<AlertInfo>({ message: "", type: "error" });

  console.log(error);

  const { connect, pendingConnector, isLoading } = useConnect({
    onSuccess: closeModal,
    onError(error) {
      setError({ message: error.message, type: "error" });
      setTimeout(() => setError({ message: "", type: "error" }), 2500);
    },
  });

  return (
    <div>
      {connectors.map((connector) => (
        <ConnectMenuOption
          key={connector.id}
          connector={connector}
          isLoading={isLoading && connector.id === pendingConnector?.id}
          onClick={() => {
            if (!isLoading && connector.id !== pendingConnector?.id) {
              connect({ connector });
            }
          }}
        />
      ))}
      <Alert message={error.message} type={error.type} />
    </div>
  );
};
export default ConnectMenu;
