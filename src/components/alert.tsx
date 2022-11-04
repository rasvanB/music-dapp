import clsx from "clsx";

export type AlertInfo = {
  message: string;
  type: "success" | "info" | "warning" | "error";
};

const Alert = ({ message, type }: AlertInfo) => {
  return <div className={clsx()}>{message}</div>;
};

export default Alert;
