import type { NextPage } from 'next';
import LiveBlocks from '../components/Liveblocks';

const Home: NextPage = () => {
  return (
    <div className="flex bg-primary h-screen w-screen">
      <LiveBlocks numberOfBlocks={1000} />
    </div>
  );
};

export default Home;
