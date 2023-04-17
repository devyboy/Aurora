import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { LoadingPage } from "~/components/atoms/loading";
import Layout from "~/components/molecules/layout";
import CreatePostWizard from "~/components/organisms/createPostWizard";
import Feed from "~/components/organisms/feed";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  api.posts.getAll.useQuery();

  if (!isLoaded) {
    return <LoadingPage />;
  }

  const layoutProps = {
    home: true,
    title: "Skybird",
    description: "Combine your Twitter and Bluesky feeds into one!",
  };

  return (
    <Layout {...layoutProps}>
      <div className="border-b border-gray-700 p-4">
        {!isSignedIn && <SignInButton />}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </Layout>
  );
};

export default Home;
