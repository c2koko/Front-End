import { IRole } from "./IRole";
import { ITicket } from "./ITicket";

export interface IUser {
    id: number;
    username: string;
    passwordHash: string;
    name: string;
    email: string;
    phone: string;
    roleId: number;
    role: IRole;
    tickets: ITicket[];
}