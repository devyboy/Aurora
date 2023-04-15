import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";
import ProfileImg from "../atoms/profileImg";

dayjs.extend(relativeTime);

type PostType = RouterOutputs["posts"]["getAll"][number];

const PostItem = (props: { data: PostType }) => {
  const {
    data: { post, author },
  } = props;

  if (!author) {
    return null;
  }

  const createdAt = dayjs(post.createdAt).fromNow();
  const postPath = `/${author.id}/${post.id}`;

  return (
    <Link href={postPath} className="flex gap-3 border-b border-gray-800 p-3">
      <ProfileImg profile={author} />
      <div>
        <div className="mb-1 flex gap-1">
          <Link href={`/${author.id}`}>
            <strong>{author.firstName}</strong>{" "}
            <span className="text-sm text-slate-500">@{author.username}</span>
          </Link>
          <span className="text-slate-500">&bull; {createdAt}</span>
        </div>
        <p>{post.content}</p>
      </div>
    </Link>
  );
};

export default PostItem;
