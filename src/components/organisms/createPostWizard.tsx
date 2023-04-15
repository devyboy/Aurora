import { useUser } from "@clerk/nextjs";
import { Progress } from "antd";
import { useState, type ChangeEvent } from "react";
import { api } from "~/utils/api";
import Button from "../atoms/button";
import ProfileImg from "../atoms/profileImg";

const MAX_POST_LENGTH = 200;

const CreatePostWizard = () => {
  const apiCtx = api.useContext();
  const [input, setInput] = useState<string>("");
  const { mutate: createPost, isLoading } = api.posts.createPost.useMutation({
    onSuccess: () => {
      setInput("");
      void apiCtx.posts.getAll.invalidate();
    },
  });

  const { user } = useUser();
  if (!user) return null;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const percentage = Math.floor((input.length / MAX_POST_LENGTH) * 100);

  return (
    <div>
      <div className="flex w-full justify-center gap-3">
        <ProfileImg
          profile={{
            username: user.username,
            id: user.id,
            profileImageUrl: user.profileImageUrl,
          }}
        />
        <textarea
          placeholder="Type something..."
          className="grow resize-none overflow-visible bg-transparent outline-none"
          value={input}
          onChange={handleInputChange}
          maxLength={MAX_POST_LENGTH}
        />
        <Progress
          className="self-center"
          type="circle"
          showInfo={false}
          strokeColor={percentage < 100 ? "rgb(67, 56, 202)" : "red"}
          trailColor="rgb(47, 51, 54)"
          strokeWidth={7}
          size={30}
          percent={percentage}
        />
        <Button
          className="self-center"
          onClick={() => createPost({ content: input })}
          disabled={isLoading}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostWizard;
