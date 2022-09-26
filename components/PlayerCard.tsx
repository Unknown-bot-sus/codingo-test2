import { IPlayer } from "@/utils/interfaces";
import { FC } from "react";
import styles from "@/styles/playerCard.module.scss";
import { useSelector } from "react-redux";
import { getPlayerTeam } from "@/store/features/teamSlice";

interface Props {
  player: IPlayer;
}

export const PlayerCard: FC<Props> = ({ player }) => {
  const team = useSelector(getPlayerTeam(player.id));

  return (
    <div className={styles["player-card"]}>
      <span>{`${player.first_name} ${player.last_name}`}</span>
      <span>Team: {team ?? "no team"}</span>
      <button>{team ? "Add to team" : "Change team"}</button>
    </div>
  );
};
