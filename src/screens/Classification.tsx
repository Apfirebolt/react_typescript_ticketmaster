import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { Classification, ClassificationResponse } from "@/types/Classification.ts";
import axiosInstance from "@/plugins/interceptor.ts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Classifications = () => {
    const [classifications, setClassifications] = useState<Classification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const getClassifications = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<ClassificationResponse>(
                `classifications.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
            );
            setClassifications(response.data._embedded.classifications);
            setLoading(false);
            console.log("Classifications data:", response.data);
        } catch (error) {
            console.error("Error fetching classifications:", error);
            setError("Failed to load classifications");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(
                `classifications.json?apikey=${
                    import.meta.env.VITE_APP_KEY
                }&keyword=${searchQuery}&locale=*`
            );
            setClassifications(response.data._embedded.classifications);
            setLoading(false);
        } catch (error) {
            console.error("Error searching classifications:", error);
            setError("Failed to search classifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClassifications();
    }, []);

    return (
        <div className="min-h-screen bg-primary-300 container mx-auto">
            <div className="p-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for classifications..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {classifications.map((classification, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{classification.type?.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {classification.segment?.name}
                                </p>
                                <button
                                    onClick={() => navigate(`/classification/${classification.id}`)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Classifications;
