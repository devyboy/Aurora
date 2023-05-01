import { type AppType } from "next/app";
import ModalContainer from "~/components/atoms/modalContainer";
import Layout from "~/components/organisms/layout";
import { ModalProvider } from "~/contexts/modalContext";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ModalContainer />
    </ModalProvider>
  );
};

export default MyApp;
