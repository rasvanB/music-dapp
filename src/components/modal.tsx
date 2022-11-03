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
      <div className="relative h-fit w-fit min-w-[220px] rounded-2xl bg-[#1A1B1F] p-5 pt-7 outline outline-1 outline-zinc-800">
        <h1 className="mt-3 mb-1 text-lg font-semibold text-gray-200">
          {title}
        </h1>
        <Divider color="#2d2e33" width="1px" />
        <div
          className="absolute top-2 right-2 w-fit cursor-pointer rounded-full bg-[#2c2d31] p-1.5 duration-100 hover:scale-110"
          onClick={() => setModalOpen(false)}
        >
          <Icon
            icon={"heroicons-solid:x"}
            className=" text-lg text-gray-300"
          ></Icon>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
