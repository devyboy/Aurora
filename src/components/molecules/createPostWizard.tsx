import { Progress } from "antd";
import { useMemo, useState, type ChangeEvent } from "react";
import Button from "../atoms/button";
import ProfileImg from "../atoms/profileImg";

const MAX_POST_LENGTH = 200;

const CreatePostWizard = () => {
  const [input, setInput] = useState<string>("");

  const percentage = useMemo(
    () => Math.floor((input.length / MAX_POST_LENGTH) * 100),
    [input.length]
  );

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleCreatePost = () => null;

  return (
    <div className="">
      <div className="flex w-full justify-center gap-3">
        <ProfileImg src={""} size={50} />
        <textarea
          placeholder="Type something..."
          className="grow resize-none overflow-visible bg-transparent text-xl placeholder-gray-500 outline-none"
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
        <Button className="self-center" onClick={handleCreatePost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostWizard;
