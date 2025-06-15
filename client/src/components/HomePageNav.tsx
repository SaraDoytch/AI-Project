
// import { NavLink } from 'react-router';

// const HomePageNav = () => {
//   return (
//     <nav style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-around',  // אפשר גם 'space-between' לפי הצורך
//       padding: '0 16px',
//       direction: 'rtl',
//       backgroundColor: '#fff',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       height: 60,
//       gap: 16
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

//       {/* כפתורי ניתוב לטפסים */}
//       <NavLink to="/loginForm" style={({ isActive }) => ({
//         color: isActive ? '#004ba0' : '#333',
//         fontWeight: isActive ? '700' : '400',
//         textDecoration: 'none'
//       })}>
//         התחברות
//       </NavLink>

//       <NavLink to="/loginIn" style={({ isActive }) => ({
//         color: isActive ? '#004ba0' : '#333',
//         fontWeight: isActive ? '700' : '400',
//         textDecoration: 'none'
//       })}>
//         הרשמה
//       </NavLink>
//     </nav>
//   );
// };

// export default HomePageNav;

import React from 'react';
import { NavLink } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/Store';  // הנתיב תלוי איפה אתה מגדיר את ה-root reducer
import { logout } from '../stores/Slices/authSlice';
import ProfileAvatar from './ProfileAvatar';

const HomePageNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 16px',
      direction: 'rtl',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      height: 60,
      gap: 16
    }}>
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

      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            התנתק
          </button>
          <ProfileAvatar name={currentUser.firstName || "?"} />
{/* {currentUser?.role === "admin" && ( */}
  <NavLink to="/admin" style={({ isActive }) => ({
    color: isActive ? '#004ba0' : '#333',
    fontWeight: isActive ? '700' : '400',
  })}>
    ניהול מערכת
  </NavLink>
{/* )} */}
        </div>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default HomePageNav;
