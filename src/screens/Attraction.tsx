import React, { useState, useEffect } from "react";
import axiosInstance from "@/plugins/interceptor.ts";
import type { Attraction, AttractionResponse } from "@/types/Attraction.ts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Attractions = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getAttractions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<AttractionResponse>(
        `attractions.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      setAttractions(response.data._embedded.attractions);
      setLoading(false);
      console.log("Attractions data:", response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
      setError("Failed to load attractions");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `attractions.json?apikey=${
          import.meta.env.VITE_APP_KEY
        }&keyword=${searchQuery}&locale=*`
      );
      setAttractions(response.data._embedded.attractions);
      setLoading(false);
    } catch (error) {
      console.error("Error searching attractions:", error);
      setError("Failed to search attractions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttractions();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for attractions..."
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
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold">{attraction.name}</h3>
                <p className="text-sm text-gray-600">
                  {attraction.classifications?.[0]?.segment?.name}
                </p>
                <button
                  onClick={() => navigate(`/attraction/${attraction.id}`)}
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

export default Attractions;
