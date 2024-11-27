import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Starship } from "../../interfaces/Starship";

// Интерфейс для состояния
interface ShipsState {
    ships: Starship[];
    status: "idle" | "loading" | "success" | "error"; // Статус загрузки
    nextUrl: string | null; // URL для следующей страницы
}

// Начальное состояние
const initialState: ShipsState = {
    ships: [],
    status: "idle",
    nextUrl: "https://swapi.dev/api/starships/", // Начальный URL
};

// Асинхронное действие для загрузки данных
export const fetchShips = createAsyncThunk(
    "ships/fetchShips",
    async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch starships");
        }
        const data = await response.json();
        return data; // Возвращаем весь объект API (results и next)
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
            .addCase(
                fetchShips.fulfilled,
                (state, action: PayloadAction<{ results: Starship[]; next: string | null }>) => {
                    state.status = "success"; // Меняем статус на "успех"
                    state.ships = [...state.ships, ...action.payload.results]; // Добавляем новые корабли
                    state.nextUrl = action.payload.next; // Обновляем nextUrl
                }
            )
            .addCase(fetchShips.rejected, (state) => {
                state.status = "error"; // Меняем статус на "ошибка"
            });
    },
});

export const { addShip, setStatus } = shipsSlice.actions;
export default shipsSlice.reducer;
