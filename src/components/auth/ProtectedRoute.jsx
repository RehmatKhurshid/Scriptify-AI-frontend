import React from 'react';
import { useAuth } from '../../context/AuthContext';
import NotFoundPage from '../../pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <NotFoundPage />;
    }

    return children;
};

export default ProtectedRoute;
