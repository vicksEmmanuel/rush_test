import React from 'react';
import LiveBlocks from '../components/Liveblocks';
import NavBar from '../components/NavBar';

export interface Props {}
const Layout = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex bg-primary h-screen" style={{ overflow: 'hidden' }}>
      <div>
        <NavBar />
        {children}
      </div>
      <LiveBlocks numberOfBlocks={280} />
    </div>
  );
};

export default Layout;
