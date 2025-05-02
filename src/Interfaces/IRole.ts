import { IUser } from "./IUser";

export interface IRole {
    id: number;
    permaId: number;
    roleName: string;
    users: IUser[];
}