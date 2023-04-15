import { LoadingPage } from "~/components/atoms/loading";
import PostItem from "~/components/molecules/postItem";
import { api } from "~/utils/api";

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex flex-col ">
      {data.map((data) => (
        <PostItem key={data.post.id} data={data} />
      ))}
      <div className="flex justify-center py-6 align-middle text-slate-500">
        <p>That&apos;s the end!</p>
      </div>
    </div>
  );
};

export default Feed;