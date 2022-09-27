import { Field } from "formik";
import { FC } from "react";
import styles from "@/styles/form/input.module.scss";
import { MyErrorMessage } from "./MyErrorMessage";

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
      <MyErrorMessage name={name} />
    </div>
  );
};
