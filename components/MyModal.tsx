import { FC, ReactNode } from "react";
import { Modal } from "./Modal";
import styles from "@/styles/myModal.module.scss";
import { ImCross } from "react-icons/im";

interface Props {
  title: string;
  children: ReactNode;
  btn: ReactNode;
}

interface Composition {
  Button: typeof Modal.Button;
}

export const MyModal: FC<Props> & Composition = ({ children, btn, title }) => {
  return (
    <Modal>
      {btn}
      <Modal.Content>
        <div className={styles.container}>
          <span className={styles.title}>{title}</span>
          <Modal.Button>
            {({ toggle }) => (
              <button onClick={toggle} className={styles.btn}>
                {<ImCross />}
              </button>
            )}
          </Modal.Button>
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
};

MyModal.Button = Modal.Button;
