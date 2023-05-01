import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import ProfileImg from "../atoms/profileImg";

dayjs.extend(relativeTime);

const PostItem = (props: { link?: boolean }) => {
  const { link = true } = props;

  // const createdAt = dayjs(post.createdAt).fromNow();

  const PostComponent = link ? Link : "div";

  return (
    <PostComponent
      href=""
      className="flex gap-3 border-b border-gray-800 bg-slate-950 p-3 dark:border-gray-300 dark:bg-white"
    >
      <Link href={``} className="h-full min-w-fit">
        <ProfileImg src={""} />
      </Link>
      <div>
        <div className="mb-1 flex items-center gap-1">
          <Link href={``}>
            <strong>author.firstName</strong>{" "}
            <span className="text-sm text-slate-500">author.username</span>
          </Link>
          <span className="text-sm text-slate-500">&bull; createdAt</span>
        </div>
        <p>post.content</p>
      </div>
    </PostComponent>
  );
};

export default PostItem;
