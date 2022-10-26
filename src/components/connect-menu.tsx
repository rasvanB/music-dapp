import Image from "next/image";
import { useConnect } from "wagmi";
import { ConnectorType, getConnector } from "../utils/wagmi";

type MenuOptionProps = {
  connector: ConnectorType;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const ConnectMenuOption = ({ connector, onClick }: MenuOptionProps) => {
  const { connect } = useConnect({ connector: getConnector(connector) });
  return (
    <div
      className="mt-1 flex cursor-pointer items-center rounded-md p-2 hover:bg-[#222429] hover:outline hover:outline-1 hover:outline-[#2f3238]"
      onClick={(event) => {
        connect();
        if (onClick) onClick(event);
      }}
    >
      <Image
        src={`/${connector.name}.png`}
        alt="wallet logo"
        width="35px"
        height="35px"
      />
      <div className="pl-3 font-medium tracking-wider text-gray-300">
        {connector.label}
      </div>
    </div>
  );
};

type ConnectMenuProps = {
  closeModal: () => void;
  options: ConnectorType[];
};

const ConnectMenu = ({ closeModal, options }: ConnectMenuProps) => {
  return (
    <div>
      {options.map((option) => (
        <ConnectMenuOption
          key={option.name}
          connector={option}
          onClick={closeModal}
        />
      ))}
    </div>
  );
};
export default ConnectMenu;
