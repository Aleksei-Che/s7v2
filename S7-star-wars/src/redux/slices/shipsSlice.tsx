import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Интерфейсы для типизации
interface Ship {
    name: string;
    model: string;
}

interface ShipsState {
    ships: Ship[];
    status: "idle" | "loading" | "success" | "error";
}

// Начальное состояние
const initialState: ShipsState = {
    ships: [],
    status: "idle",
};

// Асинхронный Thunk для загрузки данных
export const fetchShips = createAsyncThunk<Ship[]>("ships/fetchShips", async () => {
    const response = await fetch("https://swapi.dev/api/starships/");
    const data = await response.json();
    return data.results; // Возвращаем список звездолётов
});

// Создаём слайс
const shipsSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        addShip: (state, action: PayloadAction<Ship>) => {
            state.ships.push(action.payload);
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "success" | "error">) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShips.pending, (state) => {
                state.status = "loading"; 
            })
            .addCase(fetchShips.fulfilled, (state, action: PayloadAction<Ship[]>) => {
                state.status = "success"; 
                state.ships = action.payload;
            })
            .addCase(fetchShips.rejected, (state) => {
                state.status = "error"; 
            });
    },
});

// Экспортируем действия и редьюсер
export const { addShip, setStatus } = shipsSlice.actions;
export default shipsSlice.reducer;
