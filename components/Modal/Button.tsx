import { Dispatch, FC, SetStateAction, useContext } from "react";
import { ModalContext } from ".";

interface Props {
  children: FC<{
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
  }>;
}

export const Button: FC<Props> = ({ children }) => {
  const { setIsOpen } = useContext(ModalContext);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return <>{children({ setIsOpen, toggle })}</>;
};
