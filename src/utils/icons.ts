import { AlertType } from "../components/alert";

export const getIconFromAlertType = (alertType: AlertType): string => {
  switch (alertType) {
    case "error":
      return "clarity:error-line";
    case "info":
      return "clarity:error-line";
    case "success":
      return "clarity:check-circle-line";
    case "warning":
      return "clarity:warning-line";
  }
};
