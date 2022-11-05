import { cva } from "class-variance-authority";

const button = cva("h-fit select-none p-2 px-6 font-medium", {
  variants: { intent: { primary: "rounded-full bg-purple text-sm" } },
});

export default button;
