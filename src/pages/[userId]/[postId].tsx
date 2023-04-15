import Layout from "~/components/molecules/layout";
import { type RouterOutputs } from "~/utils/api";

type PostType = RouterOutputs["posts"]["getAll"][number];

const PostPage = () => {
  return <Layout title="postpage">postpage</Layout>;
};

export default PostPage;
