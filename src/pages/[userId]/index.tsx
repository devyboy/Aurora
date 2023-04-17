import { useState } from "react";
import ModalContainer from "~/components/atoms/modalContainer";
import Layout from "~/components/molecules/layout";

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <button onClick={() => setIsModalOpen(true)}>Open modal</button>
      <ModalContainer
        isModalOpen={isModalOpen}
        handleModalClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default UserPage;
