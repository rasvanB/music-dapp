import { cva } from "class-variance-authority";

const button = cva("h-fit select-none p-2 px-6 font-medium", {
  variants: {
    intent: {
      primary:
        "rounded-full bg-purple text-sm outline hover:outline-2 hover:outline-purple outline-transparent duration-300 hover:bg-transparent hover:text-purple",
    },
  },
});

export default button;
