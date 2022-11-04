import { cva } from "class-variance-authority";

const alert = cva(
  "rounded-lg text-xs font-inter p-1 px-3 flex items-center gap-1",
  {
    variants: {
      intent: {
        success: "bg-green-700/50 text-green-100",
        warning: "bg-yellow-700/50 text-yellow-100",
        error: "bg-red-700/50 text-red-100",
        info: "bg-blue-700/50 text-blue-100",
      },
    },
  }
);

export default alert;
