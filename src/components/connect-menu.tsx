import { Icon } from "@iconify/react";
import Image from "next/image";
import { Connector, useConnect } from "wagmi";

type MenuOptionProps = {
  connector: Connector;
  closeModal: () => void;
};

const ConnectMenuOption = ({ connector, closeModal }: MenuOptionProps) => {
  const { connect, pendingConnector, isLoading } = useConnect({
    onSettled: closeModal,
  });

  return (
    <div
      className="mt-1 flex cursor-pointer items-center rounded-md p-1.5 hover:bg-[#222429] hover:outline hover:outline-1 hover:outline-[#2f3238]"
      onClick={() => {
        if (!isLoading && pendingConnector === undefined) {
          connect({ connector });
        }
      }}
    >
      <Image
        src={`/${connector.id}.png`}
        alt="wallet logo"
        width="40px"
        height="40px"
      />
      <div className="w-full pl-3 text-sm font-medium tracking-wide text-gray-300">
        {isLoading && connector.id === pendingConnector?.id ? (
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
  options: Connector[];
};

const ConnectMenu = ({ closeModal, options }: ConnectMenuProps) => {
  return (
    <div>
      {options.map((option) => (
        <ConnectMenuOption
          key={option.id}
          connector={option}
          closeModal={closeModal}
        />
      ))}
    </div>
  );
};
export default ConnectMenu;
