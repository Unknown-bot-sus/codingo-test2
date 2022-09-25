import styles from "@/styles/modal.module.scss";
import { FC, ReactNode, useContext } from "react";
import { ModalContext } from ".";

interface Props {
  children: ReactNode;
}

export const Content: FC<Props> = ({ children }) => {
  const { isOpen } = useContext(ModalContext);

  return (
    <div className={styles.container} data-open={isOpen}>
      {children}
    </div>
  );
};
