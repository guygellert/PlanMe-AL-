import { Dish } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
const dishBaseQuery = () => (
    AppDataSource.getRepository(Dish)
);

export const getAllDish = () => (
    dishBaseQuery()
    .find()
);
export const insertDishes = (ListOfDishes:Array<Dish>) => (
    dishBaseQuery()
    .insert(ListOfDishes)
);