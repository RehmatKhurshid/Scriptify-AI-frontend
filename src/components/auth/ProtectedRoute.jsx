import React from 'react';
import { useAuth } from '../../context/AuthContext';
import NotFoundPage from '../../pages/NotFoundPage';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <NotFoundPage />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <NotFoundPage />;
    }

    return children;
};

export default ProtectedRoute;
