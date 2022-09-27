import { ErrorMessage } from "formik";
import { FC } from "react";

import styles from "@/styles/form/input.module.scss";

interface Props {
  name: string;
}

export const MyErrorMessage: FC<Props> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <span className={styles["error-message"]}>{msg}</span>}
    </ErrorMessage>
  );
};
