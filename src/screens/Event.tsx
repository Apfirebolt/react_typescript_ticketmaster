import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Event, EventResponse } from "@/types/Event.ts";
import axiosInstance from "@/plugins/interceptor.ts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<EventResponse>(
        `events.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      setEvents(response.data._embedded.events);
      setLoading(false);
      console.log("Events data:", response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `events.json?apikey=${
          import.meta.env.VITE_APP_KEY
        }&keyword=${searchQuery}&locale=*`
      );
      setEvents(response.data._embedded.events);
      setLoading(false);
    } catch (error) {
      console.error("Error searching events:", error);
      setError("Failed to search events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for events..."
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
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded overflow-hidden cursor-pointer"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img
                src={event.images[0]?.url}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-600">{event.dates.start.localDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
