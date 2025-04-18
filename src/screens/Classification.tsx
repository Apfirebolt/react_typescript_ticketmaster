import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type {
  Classification,
  ClassificationResponse,
} from "@/types/Classification.ts";
import axiosInstance from "@/plugins/interceptor.ts";
import { FaSearch } from "react-icons/fa";
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
    <div className="min-h-screen bg-primary-200 container mx-auto">
      <div>
        <h1 className="bg-white text-primary-200 text-center font-bold p-4 text-3xl">
          Classification
        </h1>
        <div className="p-4 flex justify-center items-center">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for attractions..."
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-secondary-300 text-secondary-200 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
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
                <h3 className="text-lg font-semibold">
                  {classification.type?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {classification.segment?.name}
                </p>
                <button
                  onClick={() =>
                    navigate(`/classification/${classification.id}`)
                  }
                  className="mt-4 px-4 py-2 bg-secondary-300 text-secondary-200 rounded hover:bg-blue-600"
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
