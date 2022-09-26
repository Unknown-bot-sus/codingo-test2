import { getTeams, updatePlayerTeam } from "@/store/features/teamSlice";
import { IPlayer, ITeam } from "@/utils/interfaces";
import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  player: IPlayer;
}

export const PlayerForm: FC<Props> = ({ player }) => {
  const dispatch = useDispatch();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updatePlayerTeam(player));
  }

  const teams = useSelector(getTeams);
  return (
    <form onSubmit={submit}>
      {teams.length === 0 ? (
        "No teams"
      ) : (
        <>
          <select>
            {teams.map((team: ITeam) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </>
      )}
    </form>
  );
};
