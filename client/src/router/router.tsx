
import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/AppLayout';
import Home from '../components/Home';
import About from '../components/About';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CreateLesson from '../components/CreateLesson';
import AdminDashboard from '../components/AdminDashboard';
import AllLessons from '../components/AllLessons';
import Instructions from '../components/Instructions';
import MyLessons from '../components/MyLessons';

const router = createBrowserRouter([
{
path: '/',
element: <AppLayout />,
children: [
{ path: '/', element: <Home /> },
{ path: '/about', element: <About /> },
{path: "loginForm", element: <LoginForm />,},
{ path: "loginIn", element: <RegisterForm /> },

{path:"admin", element :<AdminDashboard/>},
       {
        path: "AllLessons", 
        children: [
          { index: true, element: <AllLessons /> }, 
          { path: ":_id", element: <CreateLesson /> }
        ]
      },
      {path:"/instructions" , element:<Instructions />},

      {path:"/myLessons" , element:<MyLessons />}

],
},
]);
export default router;