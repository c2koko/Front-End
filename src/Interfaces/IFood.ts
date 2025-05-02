import {IRestaurant} from "./IRestaurant.ts";

export interface IFood {
    id: number;
    name: string;
    description: string;
    restaurant: IRestaurant;
    category: {id: number, name: string};
    price: number;
}