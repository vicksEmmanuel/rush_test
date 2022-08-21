import type { NextPage } from 'next';
import GameControlImageAndText from '../components/GameControlImageAndText';
import Layout from '../layout/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-row px-4 justify-center items-center xs:items-start h-full px-10">
        <GameControlImageAndText />
      </div>
    </Layout>
  );
};

export default Home;
