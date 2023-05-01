import { type NextPage } from "next";
import CreatePostWizard from "~/components/molecules/createPostWizard";
import Feed from "~/components/molecules/feed";

const Home: NextPage = () => {
  return (
    <>
      <div className="border-b border-gray-700 p-4">
        <CreatePostWizard />
      </div>
      <Feed />
    </>
  );
};

export default Home;
