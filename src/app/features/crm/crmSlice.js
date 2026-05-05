import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crmSchlorData: {},
  loginStatus: false,
  loading: false,
  error: null,
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },

    setCrmSchlorData: (state, action) => {
      state.crmSchlorData = action.payload;
    },

    clearData: (state) => {
      state.crmSchlorData = {};
      state.error = null;
      state.loginStatus = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setLoginStatus,
  setCrmSchlorData,
  clearData,
} = crmSlice.actions;

export default crmSlice.reducer;