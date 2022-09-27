import { COUNTRIES } from "@/utils/constants/countries";
import { ITeam } from "@/utils/interfaces";
import { FC } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { Input } from "./FormElements/Input";
import { Select } from "./FormElements/Select";
import { useDispatch, useSelector } from "react-redux";
import { addTeam, getTeams, updateTeam } from "@/store/features/teamSlice";

interface Props {
  id?: string;
  initialValues?: FormValues;
  submit?: (data: FormValues, actions: FormikHelpers<FormValues>) => void;
}

interface FormValues {
  name: string;
  region: string;
  country: string;
  playerCount: number;
}

export const TeamForm: FC<Props> = ({
  initialValues = {
    name: "",
    region: "",
    country: "",
    playerCount: 0,
  },
  submit: propSubmit,
  id,
}) => {
  const teams = useSelector(getTeams);
  const dispatch = useDispatch();

  const submit: (
    data: FormValues,
    actions: FormikHelpers<FormValues>
  ) => void = (data, { setSubmitting, resetForm }) => {
    dispatch(
      addTeam({
        ...data,
        id: uuid(),
        players: [],
      })
    );
    setSubmitting(false);
    resetForm();
  };

  const validationSchema = {
    name: Yup.string()
      .required("Required")
      .test(
        "Unique",
        "Team name should be uniqure",
        (value) =>
          teams.filter((team: ITeam) => team.name === value && id !== team.id)
            .length === 0
      ),
    region: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    playerCount: Yup.number().required("Required"),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={propSubmit ?? submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input type="text" name="name" label="Team Name" />
          <Input type="text" name="region" label="Region" />
          <Select
            name="country"
            label="Country"
            options={Object.entries(COUNTRIES)}
          />
          <Input type="number" name="playerCount" label="Player Count" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

interface EditTeamFormProps {
  team: ITeam;
}

export const EditTeamForm: FC<EditTeamFormProps> = ({ team }) => {
  const dispatch = useDispatch();

  function edit(
    data: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) {
    dispatch(updateTeam({ id: team.id, players: team.players, ...data }));
    setSubmitting(false);
  }

  const { id, players, ...initialValues } = team;

  return <TeamForm initialValues={initialValues} submit={edit} id={id} />;
};
