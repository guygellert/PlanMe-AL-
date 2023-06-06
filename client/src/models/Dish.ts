import { Cuisine } from "./Cuisine";

export interface Dish {
    id: number;
    name: string;
    description: string;
    photo: string;
    isMain: boolean;
    cuisines: Cuisine;
}