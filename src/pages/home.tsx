import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Loading from "~/components/atoms/loading";
import CreatePostWizard from "~/components/molecules/createPostWizard";
import Feed from "~/components/molecules/feed";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  api.posts.getAll.useQuery();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <div className="border-b border-gray-700 p-4">
        {!isSignedIn && <SignInButton />}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </>
  );
};

export default Home;
