import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import styles from "@/styles/form/input.module.scss";

interface Props {
  name: string;
  label: string;
  options: any[];
}

export const Select: FC<Props> = ({ name, label, options }) => {
  return (
    <div className={styles["form-group"]}>
      <label>{label}</label>
      <Field as="select" name={name}>
        {options.map(([value, label]) => (
          <option value={value}>{label}</option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};
