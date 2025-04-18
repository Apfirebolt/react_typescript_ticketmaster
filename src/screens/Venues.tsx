import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import useStore from "@/store.tsx";

const Venues = () => {
  const { getVenuesAction, loading, venues, error } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      getVenuesAction(searchQuery);
    }
  };

  useEffect(() => {
    getVenuesAction();
  }, []);

  return (
    <div className="min-h-screen bg-primary-200 container mx-auto">
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
          className="px-4 py-2 bg-secondary-300 text-secondary-100 rounded hover:bg-blue-600"
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
                  onClick={() => navigate(`/venues/${venue.id}`)}
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

export default Venues;
