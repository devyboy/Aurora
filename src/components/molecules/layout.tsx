import Head from "next/head";
import Link from "next/link";

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
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <header className="relative hidden w-full max-w-sm md:block">
          <div className="absolute right-4 mt-5">
            <Link href="/home" className="mb-6">
              <h1 className="text-4xl font-extrabold">Skybird</h1>
            </Link>
            <nav className="flex flex-col p-4">
              {navItems.map(({ label, to }) => (
                <Link
                  key={label}
                  href={to}
                  className="w-min rounded-xl p-4 text-left text-xl font-semibold hover:bg-white/10"
                >
                  {label}
                </Link>
              ))}
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
        <main className="h-screen w-full grow overflow-y-scroll">
          <div className="m-auto ml-0 mr-auto max-w-xl flex-col justify-center border-x border-gray-800 ">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
