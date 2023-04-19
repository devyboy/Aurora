import { useContext } from "react";
import ModalContext from "~/contexts/modalContext";

const UserPage = () => {
  const { setIsModalOpen } = useContext(ModalContext);
  return <button onClick={() => setIsModalOpen(true)}>Open modal</button>;
};

export default UserPage;
