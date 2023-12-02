import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
	element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const user = useSelector((state: RootState) => state.user.user);
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return element;
};

export default ProtectedRoute;
