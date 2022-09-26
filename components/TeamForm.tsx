import { COUNTRIES } from "@/utils/constants/countries";
import { ITeam } from "@/utils/interfaces";
import { FC } from "react";
import { Form, Formik } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { Input } from "./FormElements/Input";
import { Select } from "./FormElements/Select";
import { useDispatch, useSelector } from "react-redux";
import { addTeam, getTeams } from "@/store/features/teamSlice";

interface Props {}

export const TeamForm: FC<Props> = () => {
  const teams = useSelector(getTeams);
  const dispatch = useDispatch();

  async function submit(data: any) {
    dispatch(
      addTeam({
        ...data,
        id: uuid(),
        players: [],
      })
    );
  }

  const initialValues = {
    name: "",
    region: "",
    country: "",
    playerCount: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .test(
        "Unique",
        "Team name should be uniqure",
        (value) =>
          teams.filter((team: ITeam) => team.name === value).length === 0
      ),
    region: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    playerCount: Yup.number().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {() => (
        <Form>
          <Input type="text" name="name" label="Team Name" />
          <Input type="text" name="ergion" label="Region" />
          <Select
            name="country"
            label="Country"
            options={Object.entries(COUNTRIES)}
          />
          <Input type="text" name="playerCount" label="Player Count" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
