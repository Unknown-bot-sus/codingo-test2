export interface IPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
}

export interface ITeam {
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players: IPlayer[];
}