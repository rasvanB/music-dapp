import { Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";

type ModalProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal = ({ setModalOpen, children }: ModalProps) => {
  return (
    <div className="fixed top-0 flex h-[100vh] w-[100vw] flex-col">
      <div className="cursor-pointer p-2" onClick={() => setModalOpen(false)}>
        <Icon icon={"bi:x"}></Icon>
      </div>
      {children}
    </div>
  );
};
export default Modal;
