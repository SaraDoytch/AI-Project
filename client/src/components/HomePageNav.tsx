import { NavLink } from 'react-router';
import { navStyle } from '../CSS/nav';
import { NavbarLink } from '../CSS/homePageNav';
import { useSelector } from 'react-redux';

const HomePageNav = () => {
  return (
    <nav style={{
      ...navStyle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      direction: 'rtl',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      height: 60,
    }}>
      {/* לוגו/כותרת */}
      <NavLink
        to="/"
        style={{
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: 24,
          color: '#1976d2'
        }}
      >
        מערכת הלמידה AI
      </NavLink>

      <NavLink to="/About" style={({ isActive }) => ({
        ...NavbarLink,
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
      })}>
        אודות
      </NavLink>

      <NavLink to="/" style={({ isActive }) => ({
        ...NavbarLink,
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
      })}>
        עמוד הבית
      </NavLink>
    </nav>
  );
};

export default HomePageNav;
