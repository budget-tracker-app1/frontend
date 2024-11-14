import { create } from 'zustand';

interface AuthState {
    register: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    register: async (username, password) => {
        try {
            const response = await fetch('http://localhost:8081/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Registration failed, please try again');
        }
    },
}));
