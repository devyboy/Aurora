import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";
import ProfileImg from "../atoms/profileImg";

dayjs.extend(relativeTime);

type PostType = RouterOutputs["posts"]["getAll"][number];

const PostItem = (props: { data: PostType; link?: boolean }) => {
  const {
    data: { post, author },
    link = true,
  } = props;

  const createdAt = dayjs(post.createdAt).fromNow();
  const postPath = `/${author.id}/${post.id}`;

  const PostComponent = link ? Link : "div";

  return (
    <PostComponent
      href={postPath}
      className="flex gap-3 border-b border-gray-800 p-3"
    >
      <ProfileImg profile={author} />
      <div>
        <div className="mb-1 flex items-center gap-1">
          <Link href={`/${author.id}`}>
            <strong>{author.firstName}</strong>{" "}
            <span className="text-sm text-slate-500">@{author.username}</span>
          </Link>
          <span className="text-sm text-slate-500">&bull; {createdAt}</span>
        </div>
        <p>{post.content}</p>
      </div>
    </PostComponent>
  );
};

export default PostItem;
