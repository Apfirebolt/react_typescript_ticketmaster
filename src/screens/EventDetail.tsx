import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEventStore from "@/stores/events.ts";
import axiosInstance from "@/plugins/interceptor.ts";
import LoaderComponent from "@/components/Loader.tsx";

interface EventDetailProps {
  id: string;
}

const EventDetail: React.FC = () => {
  const { saveEvent } = useEventStore();
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

  const saveEventUtil = async () => {
    try {
      setLoading(true);
      const payload = {
        name: event.name,
        description: event.info,
        start_date: event.dates?.start?.localDate,
        start_time: event.dates?.start?.dateTime,
        location: event._embedded?.venues[0]?.name,
      };
      await saveEvent(payload);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-100 container mx-auto">
        <LoaderComponent />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available</div>;
  }

  return (
    <div className="min-h-screen bg-secondary-100 container mx-auto">
      <h1 className="bg-secondary-200 text-3xl text-primary-100 text-center py-3 px-2">
        {event.name}
      </h1>
      <div className="container px-2 py-3 mx-auto my-3">
        <div className="flex justify-between">
          <p className="w-1/2">Start Date : {event.dates?.start?.localDate}</p>
          <p className="w-1/2">Start Time : {event.dates?.start?.localTime}</p>
        </div>
        <h3>Venue</h3>
        <p>{event._embedded?.venues[0]?.name}</p>
        <p>{event._embedded?.venues[0]?.city?.name}</p>
        <p>{event._embedded?.venues[0]?.country?.name}</p>
        <p className="my-3 text-secondary-300 border-2 px-2 py-4">{event.info}</p>
        <p className="text-secondary-300">
          <span className="font-semibold text-lg text-primary-100">Ticket Limit Info:</span> {event.ticketLimit?.info}
        </p>
        {event.images && (
          <img
            src={event.images[0]?.url}
            alt={event.name}
            style={{ maxWidth: "100%" }}
            className="mx-auto my-3"
          />
        )}
        <div className="flex justify-center">
          <button
            onClick={() => saveEventUtil(event.id)}
            className="bg-primary-100 text-white py-2 mx-auto px-4 rounded hover:bg-primary-200"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
