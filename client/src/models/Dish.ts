import { Cuisine } from "./Cuisine";

export interface Dish {
    id: number;
    name: string;
    description: string;
    photo: string;
    cuisine: Cuisine;
}