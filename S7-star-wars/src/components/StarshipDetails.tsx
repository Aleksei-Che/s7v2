import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Starship } from "../interfaces/Starship";

const StarshipDetail = () => {
    const {id} = useParams<{id: string}>();
    const [starship, setStarship] = useState<Starship | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<boolean>(false);
    
    useEffect (()=> {
        const fetchStarship = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
                if(!response.ok) {
                    throw new Error("Failed to fetch starship data")
                }
                const data = await response.json();
                setStarship(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStarship();
    }, [id]);

    const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg">
            {loading && <p className="text-center text-gray-400">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {starship && (
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Изображение корабля */}
                    <div className="w-full md:w-1/2">
                        {imageError ? (
                            <p className="text-center text-gray-500">
                                Image not available
                            </p>
                        ) : (
                            <img
                                src={imageUrl}
                                alt={starship.name}
                                className="rounded-lg"
                                onError={() => setImageError(true)}
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">{starship.name}</h2>
                        <p className="text-gray-400 mb-2">
                            <strong>Model:</strong> {starship.model}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <strong>Manufacturer:</strong> {starship.manufacturer}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <strong>Cost in credits:</strong> {starship.cost_in_credits}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <strong>Length:</strong> {starship.length}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <strong>Crew:</strong> {starship.crew}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <strong>Atmospheric Speed:</strong>{" "}
                            {starship.max_atmosphering_speed}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default StarshipDetail;