import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
