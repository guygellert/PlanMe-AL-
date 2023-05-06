import { DishType } from "./dish";

export interface MealType {
    id?: number,
    mainDish: DishType,
    sideDish: DishType
}