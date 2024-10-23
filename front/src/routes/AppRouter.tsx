import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoutes';
import { Home } from '../pages/Home';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <PrivateRoute><Home /></PrivateRoute>
    },
    {
        path: '/',
        element: <Navigate to="/home" replace />
    }
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
