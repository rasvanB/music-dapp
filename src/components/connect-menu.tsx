import Image from "next/image";
import { Connector, useConnect } from "wagmi";

type MenuOptionProps = {
  connector: Connector;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const ConnectMenuOption = ({ connector, onClick }: MenuOptionProps) => {
  const { connect, connectors } = useConnect();
  console.log(connectors);

  return (
    <div
      className="mt-1 flex cursor-pointer items-center rounded-md p-2 hover:bg-[#222429] hover:outline hover:outline-1 hover:outline-[#2f3238]"
      onClick={(event) => {
        // TODO: DISABLE IF CONNECTING
        connect({ connector });
        if (onClick) onClick(event);
      }}
    >
      <Image
        src={`/${connector.id}.png`}
        alt="wallet logo"
        width="35px"
        height="35px"
      />
      <div className="pl-3 font-medium tracking-wider text-gray-300">
        {connector.name}
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
          onClick={closeModal}
        />
      ))}
    </div>
  );
};
export default ConnectMenu;
