import { IPlayer, ITeam } from "@/utils/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

export interface TeamState {
  teams: ITeam[];
  players: IPlayer[];
}

const initialState: TeamState = {
  teams: [],
  players: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams(state, action) {
      state.teams = action.payload;
    },
    setPlayers(state, action) {
      state.players = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.players,
      };
    },
  },
});

export const { setTeams, setPlayers } = teamSlice.actions;

export const getTeams = (state: AppState) => state.team.teams;
export const getPlayers = (state: AppState) => state.team.players;
export const getPlayerTeam = (id: number) => (state: AppState) =>
  state.team.teams.find((team: ITeam) =>
    team.players.find((player) => player.id === id)
  );
