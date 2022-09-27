import Head from "next/head";
import { NextPageWithLayout } from "types/page";
import Layout from "@/layouts/.";
import { get } from "@/utils/api";
import { addPlayers, getPlayers, getTeams } from "@/store/features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlayerCard } from "@/components/PlayerCard";
import { IPlayer, ITeam } from "@/utils/interfaces";

import styles from "@/styles/index.module.scss";
import { TeamCard } from "@/components/TeamCard";
import { useEffect, useState } from "react";
import { getUserName } from "@/store/features/authSlice";
import { MyModal } from "@/components/MyModal";
import { TeamForm } from "@/components/TeamForm";

interface Props {}

const Home: NextPageWithLayout<Props> = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUserName);
  const players = useSelector(getPlayers);
  const teams = useSelector(getTeams);

  const [page, setPage] = useState(0);

  async function fetchMore() {
    if (username === "") {
      return;
    }

    const res = await get(`/players?per_page=10&page=${page}`);
    dispatch(addPlayers(res.data.data));
    setPage(res.data.meta.per_page);
  }

  useEffect(() => {
    if (username === "") {
      return;
    }
    get(`/players?per_page=10&page=${page}`).then((res: any) => {
      dispatch(addPlayers(res.data.data));
      setPage(res.data.meta.per_page);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <main className={styles.container}>
        <div className={styles["card-container"]}>
          <h2>Players</h2>
          {players &&
            players.map((player: IPlayer) => (
              <PlayerCard key={player.id} player={player}></PlayerCard>
            ))}
          <button onClick={fetchMore}>Load more</button>
        </div>
        <div className={styles["card-container"]}>
          <div>
            <h2>Teams</h2>
            <MyModal
              title="Create Team"
              btn={
                <MyModal.Button>
                  {({ toggle }) => (
                    <button onClick={toggle} className={styles["team-btn"]}>
                      create Team
                    </button>
                  )}
                </MyModal.Button>
              }
            >
              <TeamForm></TeamForm>
            </MyModal>
          </div>
          {teams.length === 0 ? (
            <span>No Teams</span>
          ) : (
            teams.map((team: ITeam) => <TeamCard key={team.id} team={team} />)
          )}
        </div>
      </main>
    </div>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
