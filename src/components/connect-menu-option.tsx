import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import { Connector } from "wagmi";

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
        "mt-1 flex items-center rounded-md p-1.5 outline outline-1 outline-transparent duration-100 hover:bg-[#222429] hover:outline-[#2f3238]",
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

export default ConnectMenuOption;
