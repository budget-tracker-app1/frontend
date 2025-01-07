import React, { useEffect, useMemo } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import "./../App.css";
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
        p="2vw"
        background="linear-gradient(135deg, #a8ff78, #78ffd6)"
      >
        <Button
          onClick={toggleForm}
          position="relative"
          boxShadow="lg"
          fontSize="0.82vw"
          padding="0.8vw"
          zIndex={10}
          sx={{
            height: "2vw",
            borderRadius: "0.35vw",
          }}
        >
          {isLoginPage ? "Switch to Register" : "Switch to Login"}
        </Button>
        <Heading
          as="h1"
          position="relative"
          top="7.2vw"
          left="37%"
          width="fit-content"
          fontSize="2.5vw"
          whiteSpace="nowrap"
        >
          Budget Tracker Demo
        </Heading>

        {isLoginPage ? <LoginForm /> : <RegisterForm />}
        <Text
          position="relative"
          bottom="5.5vw"
          textAlign="center"
          fontSize="0.8vw"
        >
          Assisted by AI
        </Text>
      </Box>
    );
  }

  return null;
};

export default AuthPage;
