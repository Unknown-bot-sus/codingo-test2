import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Button } from "./Button";
import { Content } from "./Content";

interface ModalContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContext>({
  isOpen: false,
  setIsOpen: () =>
    console.error("setIsOPen is not provided in ModalContextProvider"),
});

interface Props {
  children: ReactNode;
}

interface Composition {
  Button: typeof Button;
  Content: typeof Content;
}

export const Modal: FC<Props> & Composition = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = {
    isOpen,
    setIsOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

Modal.Button = Button;

Modal.Content = Content;
