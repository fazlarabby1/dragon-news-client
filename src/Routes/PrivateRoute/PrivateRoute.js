import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

/*
    1. only allow authenticated user to visit the routes
    2.
    3. Redirect the user to the route they wanted to visit before login
*/

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='d-flex justify-content-center mt-5'>
            <Spinner animation="border" variant="primary" />
        </div>

    }

    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;