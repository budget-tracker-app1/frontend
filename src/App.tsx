import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { QueryClient, QueryClientProvider } from "react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box p={4}>
        <Button onClick={toggleForm} mb={4}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </Button>
        {isRegistering ? <RegisterForm /> : <LoginForm />}
      </Box>
    </QueryClientProvider>
  );
};

export default App;
