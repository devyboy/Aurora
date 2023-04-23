import type { ImageProps } from "next/image";
import Image from "next/image";

interface ProfileImgProps extends Omit<ImageProps, "alt"> {
  size?: number;
  className?: string;
}

const ProfileImg = ({ size = 44, className, ...rest }: ProfileImgProps) => {
  return (
    <Image
      alt=""
      height={size}
      width={size}
      className={`rounded-full ${className ?? ""}`}
      priority
      {...rest}
    />
  );
};

export default ProfileImg;
