import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem('budget_app_creds') ||
      sessionStorage.getItem('budget_app_creds');

    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
