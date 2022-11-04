import { Icon } from "@iconify/react";
import clsx from "clsx";
import alert from "../styles/alerts";
import { getIconFromAlertType } from "../utils/icons";

export type AlertType = "success" | "info" | "warning" | "error";
export type AlertInfo = {
  message: string;
  type: AlertType;
};

const Alert = ({ message, type }: AlertInfo) => {
  return (
    <div className={clsx(message ? alert({ intent: type }) : "hidden")}>
      <Icon icon={getIconFromAlertType(type)} className="text-2xl" />
      {message}
    </div>
  );
};

export default Alert;
