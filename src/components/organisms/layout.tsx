import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext, type PropsWithChildren } from "react";
import ModalContext from "~/contexts/modalContext";
import Button from "../atoms/button";
import ToggleTheme from "../atoms/toggleTheme";

const navItems = [
  { label: "Home", to: "/home" },
  { label: "Explore", to: "/explore" },
  { label: "Notifications", to: "/notifications" },
  { label: "Messages", to: "/messages" },
  { label: "Profile", to: "/profile" },
];

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const Layout = (props: PropsWithChildren) => {
  const { route } = useRouter();
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <>
      <Head>
        <title>Skybird</title>
        <meta
          name="description"
          content="Combine your Twitter and Bluesky feeds into one!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-auto flex max-w-[86rem] justify-center sm:justify-start">
        <header className="relative hidden w-full max-w-sm shrink sm:block">
          <div className="absolute right-10 mt-5">
            <Link href="/home" className="mb-6">
              <h1 className="text-4xl font-extrabold">
                <span className="hover:text-primary">Sky</span>
                <span className="hover:text-secondary">bird</span>
              </h1>
            </Link>
            <nav className="flex flex-col p-4">
              {navItems.map(({ label, to }) => {
                const isRouteActive = route === to;
                return (
                  <Link
                    key={label}
                    href={to}
                    className={`my-1 w-min rounded-xl p-3 text-left text-xl font-bold transition-all duration-150 hover:bg-white/10 dark:hover:bg-black/5 ${
                      isRouteActive
                        ? "underline decoration-secondary decoration-8 underline-offset-8"
                        : ""
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <ToggleTheme />
              <Button
                icon={plusIcon}
                className="mt-5"
                onClick={() => setIsModalOpen(true)}
              >
                New Post
              </Button>
            </nav>
          </div>
        </header>
        <main className="h-screen w-full overflow-y-scroll">
          <div className="m-auto flex min-h-full max-w-[38rem] grow flex-col border-x border-gray-800 dark:border-gray-300 sm:ml-0 sm:mr-auto">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
