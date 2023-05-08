import AppDataSource from "../../../config/ormconfig"
import { DishCategory } from "../../entities/DishCategory"

export interface DishCategoryInput {
    description: string,
}

export default class Service {
    static createDishCategory = async (dishCategory: DishCategoryInput) => {
        const newDishCategory= new DishCategory()
        Object.assign(newDishCategory, dishCategory)
        return AppDataSource.getRepository(DishCategory).save(newDishCategory)
    }
    
}