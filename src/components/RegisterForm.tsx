import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, Stack } from '@chakra-ui/react';
import { useAuthStore } from "../store/authStore";

const RegisterForm: React.FC = () => {
    const register = useAuthStore((state) => state.register);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        await register(username, password);
    };

    return (
        <Box maxWidth="400px" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="md" borderWidth="1px">
            <Heading mb="6" size="lg" textAlign="center">Register</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </FormControl>
                    
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FormControl>
                    
                    <FormControl id="confirm-password" isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </FormControl>
                    
                    <Button colorScheme="teal" type="submit" width="full">Register</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default RegisterForm;
