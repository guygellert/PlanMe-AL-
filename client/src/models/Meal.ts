import { Dish } from "./Dish";

export interface Meal {
    id: number;
    mainDish: Dish;
    sideDish: Dish;
    rating: number;
}

export interface MealCategory {
    id: number;
    description: string;
}