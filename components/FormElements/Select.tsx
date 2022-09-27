import { Field } from "formik";
import { FC } from "react";
import styles from "@/styles/form/input.module.scss";
import { MyErrorMessage } from "./MyErrorMessage";

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
        <option value="">-</option>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Field>
      <MyErrorMessage name={name} />
    </div>
  );
};
