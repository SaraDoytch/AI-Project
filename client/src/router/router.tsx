
import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/AppLayout';
import Home from '../components/Home';
import About from '../components/About';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CreateLesson from '../components/CreateLesson';
import AdminCategoryManager from '../components/AdminCategoryManager';
import AllLessons from '../components/AllLessons';

const router = createBrowserRouter([
{
path: '/',
element: <AppLayout />,
children: [
{ path: '/', element: <Home /> },
{ path: '/about', element: <About /> },
{path: "loginForm", element: <LoginForm />,},
{ path: "loginIn", element: <RegisterForm /> },

{path:"admin", element :<AdminCategoryManager/>},
       {
        path: "AllLessons", 
        children: [
          { index: true, element: <AllLessons /> }, 
          { path: ":_id", element: <CreateLesson /> }
        ]
      },

],
},
]);
export default router;