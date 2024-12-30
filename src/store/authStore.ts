import { create } from 'zustand';
import { ENDPOINTS } from "../services/servicesList";

interface AuthState {
    register: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    register: async (username, password) => {
        try {
            const response = await fetch(ENDPOINTS.REGISTER(), {
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
