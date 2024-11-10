import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem('budget_app_creds') ||
      sessionStorage.getItem('budget_app_creds');

    if (!token) {
      navigate('/', { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
