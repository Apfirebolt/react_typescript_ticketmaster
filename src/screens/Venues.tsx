import React, { useState, useEffect, ChangeEvent } from "react";
import axiosInstance from "@/plugins/interceptor.ts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Venues = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getVenues = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `venues.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      setVenues(response.data._embedded.venues);
      setLoading(false);
      console.log("Venues data:", response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to load venues");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `venues.json?apikey=${
          import.meta.env.VITE_APP_KEY
        }&keyword=${searchQuery}&locale=*`
      );
      setVenues(response.data._embedded.venues);
      setLoading(false);
    } catch (error) {
      console.error("Error searching venues:", error);
      setError("Failed to search venues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVenues();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for venues..."
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
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold">{venue.name}</h3>
                <p className="text-sm text-gray-600">
                  {venue.city?.name}, {venue.state?.stateCode}
                </p>
                <button
                  onClick={() => navigate(`/venue/${venue.id}`)}
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

export default Venues;
