import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx'
import Login from './auth/Login.jsx'; 
import ErrorPage from './pages/ErrorPage.jsx';
import Register from './auth/Register.jsx';
import Fridge from './pages/Fridge.jsx'
import AddFood from './pages/AddFood.jsx'
import MyItems from './pages/MyItems.jsx'
import FoodDetails from './pages/FoodDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/fridge",
        element: <Fridge />,
      },
      {
        path: "/add-food",
        element: <AddFood />,
      },
      {
        path: "/my-items",
        element: <MyItems />,
      },
      {
        path: "/food/:id",
        element: <FoodDetails />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
