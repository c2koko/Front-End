import { IMovie } from "./IMovie";
import { ITicket } from "./ITicket";

export interface IScreening {
    id: number;
    screeningStartTime: string; // direkt van string
    screeningLocation: string;
    movieId: number;
    movie: IMovie;
    tickets: ITicket[];
}