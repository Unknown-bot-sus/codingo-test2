import Head from "next/head";
import { NextPageWithLayout } from "types/page";
import Layout from "@/layouts/.";
import { get } from "@/utils/api";
import { getTeams, setTeams } from "@/store/features/teamSlice";
import { useSelector } from "react-redux";
import { wrapper } from "@/store/store";

interface Props {}

const Home: NextPageWithLayout<Props> = () => {
  const teams = useSelector(getTeams);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main></main>
    </div>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const res = await get("players?per_page=10");
    await store.dispatch(setTeams(res.data.data));
    return {
      props: {},
    };
  }
);

export default Home;
