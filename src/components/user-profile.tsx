import { useAtom } from "jotai";
import { userAtom } from "../utils/store";
import Image from "next/image";
import { generateIcon } from "../utils/identicon";

// TODO: THINK IF USER SHOULD BE PROP INSTEAD OF USING JOTAI HOOK
const UserProfile = () => {
  const [user] = useAtom(userAtom);
  if (!user) return null;
  return (
    <div className="flex w-fit items-center gap-3 rounded-full bg-[#1C1C1C] p-3 py-2 text-sm font-medium tracking-wider text-gray-100 outline outline-1 outline-[#2c2c2c]">
      <div className="flex">
        <Image
          src={generateIcon(user.address)}
          width={25}
          height={25}
          className="rounded-full"
          alt="profile_picture"
        ></Image>
      </div>
      {`${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
    </div>
  );
};
export default UserProfile;
