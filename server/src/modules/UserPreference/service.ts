import AppDataSource from "../../../config/ormconfig"
import { UserPreference } from "../../entity/UserPreference"
import { Cuisine } from "../../entity/Cuisine"
import { DishCategory } from "../../entity/DishCategory"
import { MealCategory } from "../../entity/MealCategory"
import { User } from "../../entity/User"
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