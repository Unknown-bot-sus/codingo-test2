import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import styles from "@/styles/form/input.module.scss";

interface Props {
  name: string;
  type: string;
  label: string;
}

export const Input: FC<Props> = ({ name, type, label }) => {
  return (
    <div className={styles["form-group"]}>
      <label>{label}</label>
      <Field type={type} name={name} />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};
