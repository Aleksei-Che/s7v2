import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchShips } from "../redux/slices/shipsSlice";

const StarshipsList = () => {
    // Получаем данные из Redux-хранилища
    const ships = useSelector((state: RootState) => state.ships.ships);
    const status = useSelector((state: RootState) => state.ships.status);
    const dispatch = useDispatch<AppDispatch>();

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        dispatch(fetchShips());
    }, [dispatch]);

    return (
        <div>
            <h1>Starships</h1>
            {/* Отображаем статус загрузки */}
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error loading starships!</p>}
            {status === "success" && ships.length === 0 && <p>No starships found!</p>}
            {/* Отображаем список кораблей */}
            {status === "success" && (
                <ul>
                    {ships.map((ship, index) => (
                        <li key={index}>
                            {ship.name} ({ship.model})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StarshipsList;
