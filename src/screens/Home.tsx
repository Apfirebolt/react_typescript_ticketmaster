import React, { useEffect } from "react";
import useAuthStore from "@/stores/auth.ts";
import useEventStore from "@/stores/events.ts";
import dayjs from "dayjs";


const Home = () => {
  const { user } = useAuthStore();
  const { getSavedEvents, savedEvents } = useEventStore();

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
      // Fetch events when the user is logged in
      getSavedEvents();
    }
  }, [user]);

  const formatDate = (date: string) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  const trimDescription = (description: string) => {
    if (!description) return "";
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  return (
    <div className="min-h-screen bg-primary-200 container text-secondary-200 mx-auto pt-6">
      <div
        className="hero-section min-h-screen flex flex-col justify-center items-center text-primary-100 text-center"
        style={{
          backgroundImage:
            "url('https://spot.io/wp-content/uploads/2018/03/ticketmaster_cover_ticketmaster_cover-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to TicketMaster</h1>
          <p className="text-lg mb-6">
            Discover and book tickets for your favorite events, concerts, and
            shows.
          </p>
        </div>

        {savedEvents && savedEvents.length > 0 && (
          <div className="mt-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Saved Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedEvents.map((event, index) => (
                <div key={index} className="bg-gray-100 text-primary-100 p-4 rounded-lg shadow">
                  <h3 className="font-semibold my-3 bg-white shadow-md px-2 py-3">{event.name}</h3>
                  <p className="my-3">{formatDate(event.start_date)}</p>
                  <p>{trimDescription(event.description)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
