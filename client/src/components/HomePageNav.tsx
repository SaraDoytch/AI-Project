// import { NavLink } from 'react-router';

// import { useSelector } from 'react-redux';

// const HomePageNav = () => {
//   return (
//     <nav style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '0 16px',
//       direction: 'rtl',
//       backgroundColor: '#fff',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       height: 60,
//     }}>
//       {/* לוגו/כותרת */}
//       <NavLink
//         to="/"
//         style={{
//           textDecoration: 'none',
//           fontWeight: '700',
//           fontSize: 24,
//           color: '#1976d2'
//         }}
//       >
//         מערכת הלמידה AI
//       </NavLink>

//       <NavLink to="/About" style={({ isActive }) => ({
//         color: isActive ? '#004ba0' : '#333',
//         fontWeight: isActive ? '700' : '400',
//       })}>
//         אודות
//       </NavLink>

//       <NavLink to="/" style={({ isActive }) => ({
//         color: isActive ? '#004ba0' : '#333',
//         fontWeight: isActive ? '700' : '400',
//       })}>
//         עמוד הבית
//       </NavLink>
//     </nav>
//   );
// };

// export default HomePageNav;
import { NavLink } from 'react-router';

const HomePageNav = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',  // אפשר גם 'space-between' לפי הצורך
      padding: '0 16px',
      direction: 'rtl',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      height: 60,
      gap: 16
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
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
      })}>
        אודות
      </NavLink>

      <NavLink to="/" style={({ isActive }) => ({
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
      })}>
        עמוד הבית
      </NavLink>

      {/* כפתורי ניתוב לטפסים */}
      <NavLink to="/loginForm" style={({ isActive }) => ({
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
        textDecoration: 'none'
      })}>
        התחברות
      </NavLink>

      <NavLink to="/loginIn" style={({ isActive }) => ({
        color: isActive ? '#004ba0' : '#333',
        fontWeight: isActive ? '700' : '400',
        textDecoration: 'none'
      })}>
        הרשמה
      </NavLink>
    </nav>
  );
};

export default HomePageNav;
