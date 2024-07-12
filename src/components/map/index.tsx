"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Cinema } from '@/lib/mapex';
import Loading from '@/app/loading';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';
import { bookMyShow } from './util';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SetViewOnClick = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords, map]);
    return null;
};

const Map: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [location, setLocation] = useState<[number, number] | null>(null);

    useEffect(() => {    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error('Error getting client location', error);
                }
            );
        }
    }, []);

    useEffect(() => {    
        if (location) {
            const fetchCinemas = async () => {
                try {
                    const options = {
                        method: 'GET',
                        url: 'https://api.foursquare.com/v3/places/nearby?ll=26.1554176%2C91.7700608&hacc=30000&query=Cine',
                        headers: {
                            accept: 'application/json',
                            Authorization: 'fsq3IlXo93h23TRCxj0mYhhp1F/ZnwImx8d/NEM3ETnheIk='
                        }
                    };
                    axios
                        .request(options)
                        .then(function (response) {
                            setCinemas(response.data.results);
                            setLoading(false);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                } catch (error) {
                    console.error('Error fetching data from Foursquare API', error);
                }
            };

            fetchCinemas();
        }
    }, [location]);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <main>
        {cinemas[0] && <p className='font-semibold text-2xl md:ml-16 ml-6 mt-6'>The Movie Theatres nearest to you are</p>}   
        <div className='flex flex-col-reverse md:flex-row overflow-hidden justify-between intems-center mt-2 mb-8'>
            <div className='md:ml-16 ml-6'>
                
                <ScrollArea className='h-[90vh]'>
                    {cinemas.sort((a, b) => a.distance - b.distance).map((cinema) => (
                        <Link 
                        href={bookMyShow[cinema.name]?`https://in.bookmyshow.com/cinemas-list/${cinema.name}/${cinema.location.locality}/${bookMyShow[cinema.name]}`:
                        `https://in.bookmyshow.com/${cinema.location.locality}/cinemas`}>
                        <div className='mt-4'>
                            <p className='text-xl font-semibold'>{cinema.name}</p>
                            {cinema.location.address ?
                                <p className='text-muted-foreground text-sm'>{cinema.location.address} ({cinema.location.cross_street})</p> :
                                <p className='text-muted-foreground text-sm'>{cinema.location.formatted_address}</p>}
                            <p>{(cinema.distance / 1000).toFixed(1)} Km</p>
                        </div>
                        </Link>
                        
                    ))}
                </ScrollArea>


            </div>
            <MapContainer center={location?location:[20.5937, 78.9629]} zoom={12} id='map'>
            <TileLayer className='h-[70vh]'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            {location && (
                <Marker position={location}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
            {cinemas.map((cinema) => (
                <Marker key={cinema.fsq_id} position={[cinema.geocodes.main.latitude, cinema.geocodes.main.longitude]}>
                    <Popup>{cinema.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
        </div>
        </main>

    );
};

export default Map;

