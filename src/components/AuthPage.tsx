import React, { useEffect, useMemo } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import './../App.css';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoginPage, setIsLoginPage } = useAuthStore((state) => state);

  const toggleForm = () => {
    setIsLoginPage(!isLoginPage);
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
      <Box
        position="relative"
        height="100vh"
        overflowY="hidden"
        p={8}
        background="linear-gradient(135deg, #a8ff78, #78ffd6)"
      >
        <Button onClick={toggleForm} position="absolute" boxShadow="lg" mb={4}>
          {isLoginPage ? "Switch to Register" : "Switch to Login"}
        </Button>
        <Heading
          as="h1"
          position="absolute"
          top="20%"
          left="50%"
          transform="translate(-50%)"
          size="2xl"
          mb={6}
        >
          Budget Tracker Demo
        </Heading>
        
        {isLoginPage ? <LoginForm /> : <RegisterForm />}
        <Text
          position="absolute"
          bottom="2%"
          left="50%"
          transform="translate(-50%)"
        >
          Assisted by AI
        </Text>
      </Box>
    );
  }

  return null;
};

export default AuthPage;
