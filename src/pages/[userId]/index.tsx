import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ProfileImg from "~/components/atoms/profileImg";

const USER_IMAGE_SIZE = 128;

const UserFeed = () => {
  return (
    <div className="flex flex-col">
      {/* {data?.map((data) => (
        <PostItem data={data} key={data.post.id} />
      ))} */}
    </div>
  );
};

const UserPage: NextPage<{ userId: string }> = ({ userId }) => {
  return (
    <>
      <div className="border-b border-gray-800 dark:border-gray-300">
        <div className="relative h-44 bg-gray-400">
          <ProfileImg
            src={""}
            size={USER_IMAGE_SIZE}
            className="absolute bottom-0 left-3 -mb-16 rounded-full border-4 border-slate-950 dark:border-white"
          />
        </div>
        <div className="h-16" />
        <div className="p-4 pb-6">
          <h2 className="text-2xl font-bold">firstName</h2>
          <h3 className="text-slate-500">emailAddresses[0]?.emailAddress</h3>
        </div>
      </div>
      <UserFeed />
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
