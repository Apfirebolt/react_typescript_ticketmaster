import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderComponent from "@/components/Loader.tsx";
import axiosInstance from "@/plugins/interceptor.ts";
import type { AttractionDetail } from "@/types/Attraction.ts";


const AttractionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [attraction, setAttraction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<AttractionDetail>(
          `attractions/${id}.json?apikey=${
            import.meta.env.VITE_APP_KEY
          }&locale=*`
        );
        setAttraction(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractionDetails();
  }, [id]);

  

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

  if (!attraction) {
    return <div>No attraction details available</div>;
  }

  return (
    <div className="min-h-screen bg-secondary-100 container mx-auto">
      <h1 className="bg-secondary-200 text-3xl text-primary-100 text-center py-3 px-2">
        {attraction.name}
      </h1>
      <div className="container p-3 mx-auto my-3">
        <div className="flex justify-between">
          <p className="w-1/2">Type: {attraction.type}</p>
          <p className="w-1/2">ID: {attraction.id}</p>
        </div>
        <h3>Upcoming Events</h3>
        <p>{attraction.upcomingEvents?.ticketmaster}</p>
        <h3>Images</h3>
        {attraction.images?.[0] && (
          <img
            src={attraction.images[0].url}
            alt={attraction.images[0].ratio}
            className="my-2"
          />
        )}
      </div>
    </div>
  );
};

export default AttractionDetail;
