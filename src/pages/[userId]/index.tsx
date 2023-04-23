import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { LoadingPage } from "~/components/atoms/loading";
import ProfileImg from "~/components/atoms/profileImg";
import Feed from "~/components/molecules/feed";
import { api } from "~/utils/api";

const USER_IMAGE_SIZE = 128;

const UserPage: NextPage<{ userId: string }> = ({ userId }) => {
  const { data, isLoading } = api.profile.getProfileById.useQuery({
    id: userId,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <>User not found</>;
  }

  const { emailAddresses, firstName, profileImageUrl } = data;

  return (
    <>
      <div className="border-b border-gray-800 dark:border-gray-300">
        <div className="relative h-44 bg-gray-400">
          <ProfileImg
            src={profileImageUrl}
            size={USER_IMAGE_SIZE}
            className="absolute bottom-0 left-3 -mb-16 rounded-full border-4 border-slate-950 dark:border-white"
          />
        </div>
        <div className="h-16" />
        <div className="p-4 pb-6">
          <h2 className="text-2xl font-bold">{firstName}</h2>
          <h3 className="text-slate-500">{emailAddresses[0]?.emailAddress}</h3>
        </div>
      </div>
      <Feed />
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const userId = context.params?.userId;
  return {
    props: {
      userId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UserPage;
