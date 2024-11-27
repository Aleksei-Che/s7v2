import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Starship } from "../../interfaces/Starship";

// Интерфейс для состояния
interface ShipsState {
    ships: Starship[]; 
    status: "idle" | "loading" | "success" | "error"; // Статус загрузки
}

// Начальное состояние
const initialState: ShipsState = {
    ships: [], 
    status: "idle", 
};

export const fetchShips = createAsyncThunk<Starship[]>(
    "ships/fetchShips",
    async () => {
        const response = await fetch("https://swapi.dev/api/starships/");
        if (!response.ok) {
            throw new Error("Failed to fetch starships");
        }
        const data = await response.json();
        return data.results; // Возвращаем массив данных о звездолётах
    }
);

const shipsSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        addShip: (state, action: PayloadAction<Starship>) => {
            state.ships.push(action.payload);
        },
        setStatus: (
            state,
            action: PayloadAction<"idle" | "loading" | "success" | "error">
        ) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShips.pending, (state) => {
                state.status = "loading"; // Меняем статус на "загрузка"
            })
            .addCase(fetchShips.fulfilled, (state, action: PayloadAction<Starship[]>) => {
                state.status = "success"; // Меняем статус на "успех"
                state.ships = action.payload; // Заполняем массив звездолётов
            })
            .addCase(fetchShips.rejected, (state) => {
                state.status = "error"; // Меняем статус на "ошибка"
            });
    },
});

export const { addShip, setStatus } = shipsSlice.actions;
export default shipsSlice.reducer;
