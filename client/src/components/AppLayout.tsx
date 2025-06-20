
import { Outlet } from 'react-router';
import HomePageNav from './HomePageNav';
// import { useSocket } from '../hooks/useSocket'; 
import { initSocketListeners } from "../socket/socketEvents";

const AppLayout = () => {
  // useSocket();
  initSocketListeners();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HomePageNav />
      <Outlet />
    </div>
  );
};

export default AppLayout;
