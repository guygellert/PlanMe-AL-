import AppDataSource from "../../../config/ormconfig"
import { Cuisine } from "../../entities/Cuisine"

export interface CuisineInput {
    description: string,
}

export default class Service {
    static createCuisine = async (cuisine: CuisineInput) => {
        const newCuisine = new Cuisine()
        Object.assign(newCuisine, cuisine)
        return AppDataSource.getRepository(Cuisine).save(newCuisine)
    }
    
}