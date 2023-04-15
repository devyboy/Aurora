import Image from "next/image";
import Link from "next/link";

interface ProfileImgProps {
  profile: {
    profileImageUrl: string;
    username: string | null;
    id: string;
  };
  size?: number;
}

const ProfileImg = (props: ProfileImgProps) => {
  const {
    profile: { profileImageUrl, username, id },
    size = 44,
  } = props;

  return (
    <Link href={`/${id}`} className="h-full min-w-fit">
      <Image
        src={profileImageUrl}
        alt={`${username ?? "User"}'s profile picture`}
        height={size}
        width={size}
        className="rounded-full"
        priority
      />
    </Link>
  );
};

export default ProfileImg;
