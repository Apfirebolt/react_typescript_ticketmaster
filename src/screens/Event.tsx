import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "@/stores/events.tsx";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Events = () => {
  const { getEventsAction, loading, events, error } = useStore();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      getEventsAction(searchQuery);
    }
  };

  useEffect(() => {
    getEventsAction();
  }, []);

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    getEventsAction(searchQuery, page + 1);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
    getEventsAction(searchQuery, page);
  };

  return (
    <div className="min-h-screen bg-primary-200 container mx-auto">
      <div>
        <h1 className="bg-white text-primary-200 text-center font-bold p-4 text-3xl">
          Events
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
            className="px-4 py-2 bg-secondary-300 text-secondary-100 rounded hover:bg-blue-600"
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
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded overflow-hidden cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <img
                  src={event.images[0]?.url}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-primary-100">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div>
                      <p className="font-semibold">Date:</p>
                      <p>{event.dates.start.localDate}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Time:</p>
                      <p>{event.dates.start.localTime}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Where:</p>
                      <p className="mt-2">{event._embedded?.venues[0]?.name}</p>
                    </div>
                  </div>

                  <Link
                    to={`/event/${event.id}`}
                    className="bg-secondary-300 text-secondary-200 text-center shadow-lg hover:bg-secondary-100 hover:text-black p-2 mt-2 block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {events.length === 0 && (
            <div className="text-center text-gray-500">No events found.</div>
          )}
          <div className="pb-3">
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => goToPreviousPage()}
                className="px-4 py-2 bg-secondary-300 text-secondary-100 rounded hover:bg-blue-600 mx-2"
                disabled={loading || page === 1}
              >
                Previous
              </button>
              <button
                onClick={() => goToNextPage()}
                className="px-4 py-2 bg-secondary-300 text-secondary-100 rounded hover:bg-blue-600 mx-2"
                disabled={loading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
