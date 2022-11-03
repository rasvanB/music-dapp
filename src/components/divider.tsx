const Divider = ({ color }: { color: string }) => {
  return (
    <div
      className="my-2 w-full rounded-full"
      style={{ borderBottom: "1px solid " + color }}
    ></div>
  );
};
export default Divider;
