import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  setIsModalOpen: () => {
    return;
  },
});

export const ModalProvider = (props: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    const className = "overflow-y-hidden";

    if (isModalOpen) {
      body?.classList.add(className);
    } else {
      body?.classList.remove(className);
    }
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
