import { Cuisine } from "./Cuisine";
import { DishCategory } from "./DishCategory";
import { MealCategory } from "./Meal";
import { User } from "./User";

export interface UserPreferences {
    id: number;
    user: User;
    cuisines: Cuisine[];
    dishCategories: DishCategory[];
    mealCategories: MealCategory[];
}