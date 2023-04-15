import Layout from "~/components/molecules/layout";
import { type RouterOutputs } from "~/utils/api";

type PostType = RouterOutputs["posts"]["getAll"][number];

const PostPage = (props: PostType) => {
  return <Layout title={props.post.authorId}>postpage</Layout>;
};

export default PostPage;
