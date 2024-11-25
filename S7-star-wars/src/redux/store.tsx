import { configureStore } from "@reduxjs/toolkit";
import shipsReducer from "./slices/shipsSlice";

const store = configureStore({
    reducer: {
        ships: shipsReducer,

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;