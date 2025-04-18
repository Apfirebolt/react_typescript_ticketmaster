import React from "react";

const Home = () => {
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
      </div>
    </div>
  );
};

export default Home;
