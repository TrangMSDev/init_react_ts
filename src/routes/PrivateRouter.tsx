
import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
import { isLogined } from '../guards';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isLogined() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;