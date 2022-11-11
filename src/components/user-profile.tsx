import { useAtom } from "jotai";
import { userAtom } from "../utils/store";
import Image from "next/image";
import { generateIcon } from "../utils/identicon";

const UserProfile = () => {
  const [user] = useAtom(userAtom);
  if (!user) return null;
  return (
    <div className="flex">
      <Image
        src={"data:image/svg+xml;base64," + generateIcon(user?.address)}
        width={50}
        height={50}
        alt="profile_picture"
      ></Image>
      {user?.address}
    </div>
  );
};
export default UserProfile;
