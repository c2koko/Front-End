import { IScreening } from "./IScreening";
import { IUser } from "./IUser";

export interface ITicket {
    id: number;
    dateOfPurchase: string; // direkt van string
    price: number;
    ticketVerified: boolean;
    userId?: number | null; 
    user?: IUser | null;
    screeningId: number;
    screening: IScreening;
}

export interface ITicketCreateDto {
    dateOfPurchase: string; 
    price: number;
    ticketVerified: boolean;
    screeningId: number;
}

export interface TicketVerifyDto {
    ticketVerified: boolean;
  }