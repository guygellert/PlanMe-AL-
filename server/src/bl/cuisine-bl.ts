import { Cuisine } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
const cuisineBaseQuery = () => (
    AppDataSource.getRepository(Cuisine)
);

export const getAllCuisine = () => (
    cuisineBaseQuery()
    .find()
);
export const insertCuisines = (ListOfCuisines:Array<Cuisine>) => (
    cuisineBaseQuery()
    .insert(ListOfCuisines)
);
