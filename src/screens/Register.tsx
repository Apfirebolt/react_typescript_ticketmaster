import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.tsx";
import { FaLock, FaUserAlt, FaEnvelope } from "react-icons/fa";

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegister = async (): Promise<void> => {
        setError("");
        setLoading(true);

        try {
            const authStore = useAuthStore.getState();
            await authStore.register(username, email, password);
            navigate("/login");
        } catch (err: any) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-primary-200 mb-6">
                    Register
                </h1>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaUserAlt className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full outline-none"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full outline-none"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <div className="flex items-center border border-gray-300 rounded p-2">
                        <FaLock className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full outline-none"
                        />
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full px-4 py-2 bg-secondary-300 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-secondary-300 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
