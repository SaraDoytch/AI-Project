// // import { createBrowserRouter } from "react-router";
// import { createBrowserRouter } from "react-router";

// import AppLayout from "../components/AppLayout";
// import Home from "../components/Home";
// import About from "../components/About";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "About", element: <About /> },
//     ]
//   }
// ]);

// export default router;


import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/AppLayout';
import Home from '../components/Home';
import About from '../components/About';

const router = createBrowserRouter([
{
path: '/',
element: <AppLayout />,
children: [
{ path: '/', element: <Home /> },
{ path: '/about', element: <About /> },
],
},
]);
export default router;