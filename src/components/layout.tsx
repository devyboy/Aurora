import { type PropsWithChildren } from "react";

type LayoutProps = {
  home?: boolean;
};

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return <div>{props.children}</div>;
};

export default Layout;
