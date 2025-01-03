import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import { STORAGE } from "../utils/storage";
import { EStorage, EStorageKeys } from "../models";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const TOAST_ID = "error-toast";

  const { mutate } = useMutation({
    mutationFn: () =>
      REQUEST.post(
        ENDPOINTS.LOGIN(),
        { username, password },
        {
          headers: { Authorization: "" },
        }
      ),
    onSuccess: (response) => {
      // console.log(response);

      setIsLoading(false);
      const creds = response.data;
      STORAGE({
        type: EStorage.SESSION,
        key: EStorageKeys.BUDGET_APP_CREDS,
      }).set(creds);
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Logged in.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Login error.",
          description: "Given wrong credentials.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    mutate();
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
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
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
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
            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              boxShadow="lg"
              mt="30px"
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
