import { IMovie } from "./IMovie";
import { ITicket } from "./ITicket";
import { IRoom } from "./IRoom";

export interface IScreening {
    id: number;
    screeningStartTime: string; // direkt van string
    movieId: number;
    movie: IMovie;
    tickets: ITicket[];
    roomId : number;
    room: Room;

}

export interface ICreateScreeningDto{
    screeningStartTime: string;
    movieId: number;
    roomId: number;
}

export interface IUpdateScreeningDto{
    screeningStartTime: string;
    movieId: number;
    roomId: number;
}