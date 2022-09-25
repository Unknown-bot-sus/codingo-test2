import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

export interface AuthState {
  name: string | null;
}

const initialState: AuthState = {
  name: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    clearName(state) {
      state.name = "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.name,
      };
    },
  },
});

export const { setName, clearName } = authSlice.actions;

export const getUserName = (state: AppState) => state.auth.name;
