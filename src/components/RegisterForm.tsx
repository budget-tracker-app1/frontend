import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";

const RegisterForm: React.FC = () => {
  const register = useAuthStore((state) => state.register);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const TOAST_ID = "error-toast";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validCharactersRegex = /^[a-zA-Z0-9!@#$%^&*_-]+$/;

    if (username.length < 3) {
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Error.",
          description: "Username must be at least 3 characters long.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    if (!validCharactersRegex.test(username)) {
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Error.",
          description: "Username contains unsupported characters.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    if (password.length < 3) {
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Error.",
          description: "Password must be at least 3 characters long.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    if (!validCharactersRegex.test(password)) {
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Error.",
          description: "Password contains unsupported characters.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    if (password !== confirmPassword) {
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Error.",
          description: "Passwords do not match.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    await register(username, password, toast, setIsLoading);
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Box
        width="400px"
        mx="auto"
        p="6"
        bgColor="#e6e6e6"
        boxShadow="2xl"
        borderRadius="md"
        borderWidth="1px"
      >
        <Heading mb="6" size="lg" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                maxLength={32}
                bgColor="#FFFFFF"
                boxShadow="md"
                _focus={{
                  boxShadow: "lg",
                  outline: "none",
                  borderColor: "transparent",
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                maxLength={32}
                bgColor="#FFFFFF"
                boxShadow="md"
                _focus={{
                  boxShadow: "lg",
                  outline: "none",
                  borderColor: "transparent",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                maxLength={32}
                bgColor="#FFFFFF"
                boxShadow="md"
                _focus={{
                  boxShadow: "lg",
                  outline: "none",
                  borderColor: "transparent",
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              boxShadow="lg"
              mt="30px"
              isLoading={isLoading}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
