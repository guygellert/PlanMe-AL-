import AppDataSource from "../../../config/ormconfig"
import { UserPreference } from "../../entities/UserPreference"
import { Cuisine } from "../../entities/Cuisine"
import { DishCategory } from "../../entities/DishCategory"
import { MealCategory } from "../../entities/MealCategory"
import { User } from "../../entities/User"
export interface UserPreferenceInput {
    id:User,
    cuisine: Cuisine[],
    dishCategory:DishCategory[],
    mealCategory:MealCategory[]
}

export default class Service {
    static updateUserPreference = async (userPreference: UserPreferenceInput) => {
        const newUserPreference= new UserPreference()
        Object.assign(newUserPreference, userPreference)
        return AppDataSource.getRepository(UserPreference).save(newUserPreference)
    }
    
}