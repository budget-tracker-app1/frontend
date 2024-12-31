import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  const token = useMemo(() => {
    return (
      localStorage.getItem("budget_app_creds") ||
      sessionStorage.getItem("budget_app_creds")
    );
  }, []);  

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <Box p={4}>
        <Button onClick={toggleForm} mb={4}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </Button>
        {isRegistering ? <RegisterForm /> : <LoginForm />}
      </Box>
    );
  }

  return null;
};

export default AuthPage;
