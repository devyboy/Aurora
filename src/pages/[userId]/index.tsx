import type { User } from "@clerk/nextjs/dist/api";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Loading from "~/components/atoms/loading";
import ProfileImg from "~/components/atoms/profileImg";
import PostItem from "~/components/molecules/postItem";
import { api } from "~/utils/api";
import filterUsersToAuthor from "~/utils/filterUsersToAuthor";

const USER_IMAGE_SIZE = 128;

const UserFeed = ({ user }: { user: User }) => {
  const filteredUser = filterUsersToAuthor(user);
  const { isLoading, data } = api.posts.getPostsByUser.useQuery({
    user: filteredUser,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <>user hasn&apos;t posted yet</>;
  }

  return (
    <div className="flex flex-col">
      {data?.map((data) => (
        <PostItem data={data} key={data.post.id} />
      ))}
    </div>
  );
};

const UserPage: NextPage<{ userId: string }> = ({ userId }) => {
  const { data, isLoading } = api.profile.getProfileById.useQuery({
    id: userId,
  });

  if (isLoading) {
    return <Loading />;
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
      <UserFeed user={data} />
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
