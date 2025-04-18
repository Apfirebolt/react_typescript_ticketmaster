import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/plugins/interceptor.ts";
import { useNavigate } from "react-router-dom";

interface EventDetailProps {
  id: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<EventDetailProps>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `events/${id}.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
        );
        setEvent(response.data);
        setLoading(false);
        console.log("Event details:", response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available</div>;
  }

  return (
    <div className="min-h-screen bg-primary-200 container mx-auto">
      <h1 className="bg-secondary-200 text-white text-center py-3 px-2">
        {event.name}
      </h1>
      <div className="container mx-auto my-3">
        <div className="flex justify-between">
          <p className="w-1/2">Start Date : {event.dates?.start?.localDate}</p>
          <p className="w-1/2">Start Time : {event.dates?.start?.localTime}</p>
        </div>
        <h3>Venue</h3>
        <p>{event._embedded?.venues[0]?.name}</p>
        <p>{event._embedded?.venues[0]?.city?.name}</p>
        <p>{event._embedded?.venues[0]?.country?.name}</p>
        <p className="my-3 text-secondary-300">{event.info}</p>
        {event.images && (
          <img
            src={event.images[0]?.url}
            alt={event.name}
            style={{ maxWidth: "100%" }}
            className="mx-auto my-3"
          />
        )}
      </div>
    </div>
  );
};

export default EventDetail;
