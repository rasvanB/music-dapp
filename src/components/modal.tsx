import { Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";
import Divider from "./divider";

type ModalProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
};

const Modal = ({ setModalOpen, children, title }: ModalProps) => {
  return (
    <div className="fixed top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-30">
      <div className="relative h-fit w-fit min-w-[220px] rounded-lg bg-[#1A1B1F] px-5 pb-5 outline outline-1 outline-zinc-800">
        <div className="mt-3 mb-3 flex items-center">
          <h1 className="text-md mr-9 font-semibold text-gray-200">{title}</h1>
          <div
            className=" w-fit cursor-pointer rounded-lg p-1.5 duration-100 hover:scale-105 hover:bg-[#2c2d31]"
            onClick={() => setModalOpen(false)}
          >
            <Icon
              icon={"heroicons-solid:x"}
              className=" text-lg text-gray-300"
            ></Icon>
          </div>
        </div>
        <Divider color="#2d2e33" width="1px" />
        {children}
      </div>
    </div>
  );
};
export default Modal;
