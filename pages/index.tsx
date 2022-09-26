import Head from "next/head";
import { NextPageWithLayout } from "types/page";
import Layout from "@/layouts/.";
import { get } from "@/utils/api";
import {
  getPlayers,
  getTeams,
  setPlayers,
  setTeams,
} from "@/store/features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";
import { PlayerCard } from "@/components/PlayerCard";
import { IPlayer, ITeam } from "@/utils/interfaces";

import styles from "@/styles/index.module.scss";
import { TeamCard } from "@/components/TeamCard";

interface Props {}

const Home: NextPageWithLayout<Props> = () => {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const teams = useSelector(getTeams);

  async function fetchPlayers() {
    const res = await get(`players?per_page=10`);
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={styles.container}>
        <div className={styles["card-container"]}>
          <h2>Players</h2>
          {players.map((player: IPlayer) => (
            <PlayerCard player={player}></PlayerCard>
          ))}
        </div>
        <div className={styles["card-container"]}>
          <h2>Teams</h2>
          {teams.length === 0 ? (
            <span>No Teams</span>
          ) : (
            teams.map((team: ITeam) => <TeamCard team={team} />)
          )}
        </div>
      </main>
    </div>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const res = await get("players?per_page=10");
    await store.dispatch(setPlayers(res.data.data));
    return {
      props: {},
    };
  }
);

export default Home;
