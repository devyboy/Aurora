import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { LoadingPage } from "~/components/atoms/loading";
import Layout from "~/components/molecules/layout";
import PostItem from "~/components/molecules/postItem";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/utils/ssgHelper";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({
    id: postId,
  });

  if (isLoading) {
    return (
      <Layout>
        <LoadingPage />
      </Layout>
    );
  }

  if (!data) {
    return <h1>404</h1>;
  }

  const { author } = data;

  return (
    <Layout title={`${author.username} on Skybird`}>
      <PostItem data={data} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const postId = context.params?.postId;

  if (typeof postId !== "string") throw new Error("no post id");

  await ssg.posts.getPostById.prefetch({ id: postId });

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
