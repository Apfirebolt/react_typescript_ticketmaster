import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import axiosInstance from "@/plugins/interceptor.ts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Home = () => {

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `events.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      setEvents(response.data._embedded.events);
      setLoading(false);
      console.log("Events data:", response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = (page: number) => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get(
        `events.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*&page=${page}`
      )
      .then((response) => {
        setEvents(response.data._embedded.events);
        setLoading(false);
      }
      )
      .catch((error) => {
        setLoading(false);
        setError("Failed to load events");
      }
      );
  };
  const handlePageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(event.target.value, 10);
    goToNextPage(selectedPage);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-primary-200 container mx-auto">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={event.images[0]?.url}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.dates.start.localDate}</p>
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
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

export default Home;
