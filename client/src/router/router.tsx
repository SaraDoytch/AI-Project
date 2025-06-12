
import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/AppLayout';
import Home from '../components/Home';
import About from '../components/About';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Learning from '../components/Learning';

const router = createBrowserRouter([
{
path: '/',
element: <AppLayout />,
children: [
{ path: '/', element: <Home /> },
{ path: '/about', element: <About /> },
   {
        path: "loginForm", element: <LoginForm />,
      },
      { path: "loginIn", element: <RegisterForm /> },
      { path: "Learning", element: <Learning /> },

],
},
]);
export default router;