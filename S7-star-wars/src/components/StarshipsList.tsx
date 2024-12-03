import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchShips } from "../redux/slices/shipsSlice";
import { Link } from "react-router-dom";

const StarshipsList = () => {
    const ships = useSelector((state: RootState) => state.ships.ships);
    const status = useSelector((state: RootState) => state.ships.status);
    const dispatch = useDispatch<AppDispatch>();

    const [nextUrl, setNextUrl] = useState<string | null>("https://swapi.dev/api/starships/");
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    useEffect(() => {
        if (nextUrl && ships.length === 0) {
            dispatch(fetchShips(nextUrl));
        }
    }, [dispatch, nextUrl, ships.length]);

    const loadMoreShips = async () => {
        if (!nextUrl) return;

        setLoadingMore(true);
        try {
            const response = await fetch(nextUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch next page of starships");
            }
            const data = await response.json();
            dispatch(fetchShips(nextUrl));
            setNextUrl(data.next || null);
        } catch (error) {
            console.error("Error fetching more starships:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className="bg-gray-900 flex flex-col mx-auto max-w-4xl p-4 text-gray-200">
            {status === "loading" && <p className="text-center text-gray-400">Loading...</p>}
            {status === "error" && <p className="text-center text-red-500">Error loading starships!</p>}
            {status === "success" && ships.length === 0 && (
                <p className="text-center text-gray-400">No starships found!</p>
            )}
            {status === "success" && ships.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Starships</h2>
                    <ul className="space-y-4">
                        {ships.map((ship) => {
                            const id = ship.url.split("/").slice(-2, -1)[0];
                            return (
                                <li
                                    key={id}
                                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700"
                                >
                                    <Link
                                        to={`/starships/${id}`}
                                        className="text-lg font-bold text-white hover:underline cursor-pointer"
                                    >
                                        {ship.name}
                                    </Link>
                                    <p className="text-gray-400">{ship.model}</p>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
            {nextUrl && (
                <button
                    onClick={loadMoreShips}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={loadingMore}
                >
                    {loadingMore ? "Loading more..." : "Load More"}
                </button>
            )}
        </div>
    );
};

export default StarshipsList;
