import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PostItem from "~/components/molecules/postItem";

const PostPage: NextPage = () => {
  return <PostItem link={false} />;
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
