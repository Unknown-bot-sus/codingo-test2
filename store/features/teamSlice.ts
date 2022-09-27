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
    addTeams(state, action) {
      state.teams = [...state.teams, ...action.payload];
    },
    addTeam(state, action) {
      state.teams = [...state.teams, action.payload];
    },
    updateTeam(state, action) {
      state.teams = state.teams.map((team) =>
        team.id === action.payload.id ? { ...team, ...action.payload } : team
      );
    },
    deleteTeam(state, action) {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },
    setPlayers(state, action) {
      state.players = action.payload;
    },
    addPlayers(state, action) {
      state.players = [...state.players, ...action.payload];
    },
    updatePlayerTeam(state, action) {
      state.teams = state.teams.map((team: ITeam) => {
        if (team !== action.payload.teamId) {
          return team;
        }

        return {
          ...team,
          players: [...team.players, action.payload.player],
        };
      });
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

export const {
  setTeams,
  addTeam,
  addTeams,
  updateTeam,
  deleteTeam,
  setPlayers,
  addPlayers,
  updatePlayerTeam,
} = teamSlice.actions;

export const getTeams = (state: AppState) => state.team.teams;
export const getPlayers = (state: AppState) => state.team.players;
export const getPlayerTeam = (id: number) => (state: AppState) =>
  state.team.teams.find((team: ITeam) =>
    team.players.find((player) => player.id === id)
  );
