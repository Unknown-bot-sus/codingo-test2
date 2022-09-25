import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

export interface TeamState {
  teams: [];
}

const initialState: TeamState = {
  teams: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams(state, action) {
      state.teams = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.teams,
      };
    },
  },
});

export const { setTeams } = teamSlice.actions;

export const getTeams = (state: AppState) => state.team.teams;
