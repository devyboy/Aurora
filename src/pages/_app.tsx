import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import ModalContainer from "~/components/atoms/modalContainer";
import Layout from "~/components/organisms/layout";
import { ModalProvider } from "~/contexts/modalContext";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ModalContainer />
      </ModalProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
