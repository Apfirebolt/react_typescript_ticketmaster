import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/plugins/interceptor.ts';
import { useNavigate } from 'react-router-dom';

interface VenuDetailProps {
    id: string;
}

const VenuDetail: React.FC = () => {

    const { id } = useParams<VenuDetailProps>();
    const [venue, setVenue] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenueDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(
                    `venues/${id}.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
                );
                setVenue(response.data);
                setLoading(false);
                console.log('Venue details:', response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVenueDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!venue) {
        return <div>No venue details available</div>;
    }

    return (
        <div>
            <h1 className="bg-secondary-200 text-white text-center py-3 px-2">{venue.name}</h1>
            <div className="container mx-auto my-3">
                <div className="flex justify-between">
                    <p className="w-1/2">City : {venue.city?.name}</p>
                    <p className="w-1/2">Country : {venue.country?.name}</p>
                </div>
                <h3>Address</h3>
                <p>{venue.address?.line1}</p>
                <p>{venue.postalCode}</p>
                <p className="my-3 text-secondary-300">{venue.generalInfo?.generalRule}</p>
                {venue.images && (
                    <img src={venue.images[0]?.url} alt={venue.name} style={{ maxWidth: '100%' }} className="mx-auto my-3" />
                )}
            </div>
        </div>
    );
};

export default VenuDetail;
