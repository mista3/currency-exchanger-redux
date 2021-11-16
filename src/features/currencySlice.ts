import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async (baseCode: string) => {
    const response: { data: { query: {}; data: {} } } = await axios.get(
      `https://freecurrencyapi.net/api/v2/latest?apikey=56f8e570-2e43-11ec-bfde-632279073c09&base_currency=${baseCode}`
    );
    return Object.entries(response.data.data);
  }
);

interface currencyState {
  amount: number;
  loading: boolean;
  currencyFilter: string[];
  exchangedCurrencies: any[][];
  isDarkMode: boolean;
}

const initialState: currencyState = {
  amount: 1,
  loading: false,
  currencyFilter: [],
  exchangedCurrencies: [],
  isDarkMode: true,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
    },

    setCurrencyFilter(state, action: PayloadAction<string[]>) {
      state.currencyFilter = action.payload;
    },

    toggleMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<any[][]>) => {
          state.exchangedCurrencies = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { setAmount, setCurrencyFilter,toggleMode } = currencySlice.actions;

export default currencySlice.reducer;
