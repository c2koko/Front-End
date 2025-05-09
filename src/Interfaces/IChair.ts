/*export interface IChair {
    id: number;
    collumm: number;
    row: number;
    // roomsChairs: IRoomChair[];
}*/
export interface IChair{
    id: number;
    isReserved: boolean;
    screeningId: number;
}