import { create } from "zustand";
import { ENDPOINTS } from "../services/servicesList";

interface AuthState {
  isLoginPage: boolean;
  setIsLoginPage: (value: boolean) => void;
  register: (
    username: string,
    password: string,
    toast: any,
    setIsLoading: (value: boolean) => void
  ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoginPage: true,
  setIsLoginPage: (value) => set({ isLoginPage: value }),
  register: async (username, password, toast, setIsLoading) => {
    try {
      setIsLoading(true);

      const response = await fetch(ENDPOINTS.REGISTER(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Server error. Registration failed. Please try again.");
      }

      if (!toast.isActive("error-toast")) {
        toast({
          title: "Success.",
          description: "Registration successful! Please log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      set({ isLoginPage: true });
    } catch (error: any) {
      if (!toast.isActive("error-toast")) {
        toast({
          id: "error-toast",
          title: "Error.",
          description: error.message || "Registration failed, please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  },
}));
