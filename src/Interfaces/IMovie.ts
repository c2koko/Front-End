import { IScreening } from "./IScreening";

export interface IMovie {
    id: number;
    movieName: string;
    movieDescription?: string | null;
    movieDuration: number;
    screenings: IScreening[];
    movieImg: string | null;
} 