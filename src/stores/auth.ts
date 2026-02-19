import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "@/lib/utils.ts";

interface AuthState {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
    fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    login: async (email: string, password: string) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.post("http://localhost:8000/api/auth/login", { email, password }, {
                timeout: 10000
            });
            if (response.status !== 200) {
                throw new Error("Login failed");
            }
            toast.success("Login successful", toastOptions);
            // Save user and token in the store and localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.access_token); // Save token to localStorage
            set({ user: response.data.user, token: response.data.access_token });
        } catch (error) {
            console.error("Login error:", error);
            set({ error: "Failed to login" });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        console.log("Logging out...");
        set({ user: null, token: null });
        toast.success("Logout successful", toastOptions);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    },
    register: async (username: string, email: string, password: string) => {
        try {
            set({ loading: true, error: null });
            await axios.post("http://localhost:8000/api/auth/register", { username, email, password });
        } catch (error) {
            console.error("Registration error:", error);
            set({ error: "Failed to register" });
        } finally {
            set({ loading: false });
        }
    },
    fetchUser: async () => {
        try {
            set({ loading: true, error: null });
            const token = localStorage.getItem("token");
            if (!token) {
                set({ error: "No token found" });
                return;
            }
            const response = await axios.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ user: response.data });
        } catch (error) {
            console.error("Fetch user error:", error);
            set({ error: "Failed to fetch user" });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useAuthStore;
