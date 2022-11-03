type DividerProps = {
  color: string;
  width: `${number}px`;
};

const Divider = ({ color, width }: DividerProps) => {
  return (
    <div
      className="my-2 w-full rounded-full"
      style={{ borderBottom: width + " solid " + color }}
    ></div>
  );
};
export default Divider;
