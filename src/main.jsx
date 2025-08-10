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
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Analytics from './pages/Analytics.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

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
        path: "/fridge",
        element: <Fridge />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-items",
        element: (
          <PrivateRoute>
            <MyItems />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
    ]
  },
  {
      path: '/',
      Component: AuthLayout,
      children: [
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        
      ]
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='dosis-regular'>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </div>
  </StrictMode>,
)
