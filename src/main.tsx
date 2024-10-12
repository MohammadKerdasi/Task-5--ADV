import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import App from './App';
import ShowItem from './Pages/ShowItem'
import Create from './Pages/Create';
import Update from './Pages/Update';

const routes = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem("token") ? <Navigate to="/home"/> : <Login />,
  },
  {
    path: '/signup',
    element: localStorage.getItem("token") ? <Navigate to="/" /> : <SignUp />,
  },
  {
    path: '/home',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'show/:id', 
        element: <ShowItem />,
      },
      {
        path: 'create', 
        element: <Create />,
      },
      {
        path: 'edit/:id', 
        element: <Update />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
