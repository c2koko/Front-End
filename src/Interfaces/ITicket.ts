import { IScreening } from "./IScreening";
import { IUser } from "./IUser";
import { IChair } from "./IChair";

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
    chairs: IChair[];
}

export interface ITicketVerifyDto {
    ticketVerified: boolean;
  }