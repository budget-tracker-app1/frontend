import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from "react-query";
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import { STORAGE } from "../utils/storage";
import { EStorage, EStorageKeys } from "../models";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.LOGIN(), {username, password}, {
        headers: { Authorization: '' }
      }),
    onSuccess: (response) => {
      // console.log(response);

      const creds = response.data;
      STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).set(creds);
      toast({
        title: "Logged in.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUsername('');
      setPassword('');
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
      toast({
        title: "Login error.",
        description: "Given wrong credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate();
  };

  return (
    <Box width="400px" mx="auto" mt="100px" p={5} borderWidth={1} borderRadius="lg">
        <Heading mb="6" size="lg" textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
