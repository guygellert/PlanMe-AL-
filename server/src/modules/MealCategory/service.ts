import AppDataSource from "../../../config/ormconfig"
import { MealCategory } from "../../entity/MealCategory"

export interface MealCategoryInput {
    description: string,
}

export default class Service {
    static createMealCategory = async (mealCategory: MealCategoryInput) => {
        const newMealCategory= new MealCategory()
        Object.assign(newMealCategory, mealCategory)
        return AppDataSource.getRepository(MealCategory).save(newMealCategory)
    }
    
}