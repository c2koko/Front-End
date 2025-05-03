import { IScreening } from "./IScreening";

export interface IMovie {
    id: number;
    movieName: string;
    movieDescription?: string | null;
    movieDuration: number;
    screenings: IScreening[];
    movieImg: string | null;
}

export interface IMovieUpdate {
    movieName: string;
    movieImg: string;
    movieDescription: string;
    movieDuration: number;
  } 

  export interface ICreateMovie{
    movieName: string;
    movieImg: string;
    movieDescription: string;
    movieDuration: number;
  }