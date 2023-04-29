import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Loading from "~/components/atoms/loading";
import PostItem from "~/components/molecules/postItem";
import { api } from "~/utils/api";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({
    id: postId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <>404</>;
  }

  return <PostItem data={data} link={false} />;
};

export const getStaticProps: GetStaticProps = (context) => {
  const postId = context.params?.postId;

  if (typeof postId !== "string") throw new Error("no post id");

  return {
    props: {
      postId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostPage;
