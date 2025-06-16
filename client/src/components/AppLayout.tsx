
import { Outlet } from 'react-router';
import HomePageNav from './HomePageNav';

const AppLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HomePageNav />
      <Outlet />
    </div>
  );
};

export default AppLayout;
