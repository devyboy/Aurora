import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { type PropsWithChildren } from "react";
import Button from "../atoms/button";

type LayoutProps = {
  home?: boolean;
  title?: React.ReactNode;
  description?: string;
};

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

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const { route } = useRouter();
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center sm:justify-start">
        <header className="relative hidden w-full max-w-md shrink sm:block">
          <div className="absolute right-16 mt-5">
            <Link href="/home" className="mb-6">
              <h1 className="text-4xl font-extrabold">Skybird</h1>
            </Link>
            <nav className="flex flex-col p-4">
              {navItems.map(({ label, to }) => {
                const isRouteActive = route === to;
                return (
                  <Link
                    key={label}
                    href={to}
                    className={`my-1 w-min rounded-xl p-3 text-left text-xl font-bold transition-all duration-150 hover:bg-white/10 ${
                      isRouteActive ? "text-secondary" : ""
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <Button
                icon={plusIcon}
                className="mt-5"
                onClick={() => console.log("testing")}
              >
                New Post
              </Button>
            </nav>
          </div>
        </header>
        <main className="h-screen shrink-0 grow overflow-y-scroll">
          <div className="m-auto w-full max-w-xl flex-col justify-center border-x border-gray-800 sm:ml-0 sm:mr-auto">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
