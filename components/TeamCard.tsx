import { ITeam } from "@/utils/interfaces";
import { FC } from "react";
import styles from "@/styles/teamCard.module.scss";
import { COUNTRIES } from "@/utils/constants/countries";
import { MyModal } from "./MyModal";

import { BiEdit, BiTrash } from "react-icons/bi";
import { EditTeamForm, TeamForm } from "./TeamForm";
import { useDispatch } from "react-redux";
import { deleteTeam } from "@/store/features/teamSlice";
interface Props {
  team: ITeam;
}

export const TeamCard: FC<Props> = ({ team }) => {
  const dispatch = useDispatch();
  function deteleTeam() {
    const res = confirm(`Are you sure you want to delete ${team.name}?`);
    if (!res) return;

    dispatch(deleteTeam(team.id));
  }

  return (
    <div className={styles["team-card"]}>
      <span>{team.name}</span>
      <span>Region: {team.region}</span>
      <span>Country: {COUNTRIES[team.country]}</span>
      <span>Player count: {team.playerCount}</span>
      <div>
        <MyModal
          title="Edit Team"
          btn={
            <MyModal.Button>
              {({ toggle }) => (
                <button onClick={toggle}>
                  <BiEdit />
                </button>
              )}
            </MyModal.Button>
          }
        >
          {<EditTeamForm team={team} />}
        </MyModal>
        <button onClick={deteleTeam}>
          <BiTrash />
        </button>
      </div>
    </div>
  );
};
