import { Dish } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
const dishBaseQuery = () => (
    AppDataSource.getRepository(Dish)
);

export const getAllDish = () => (
    dishBaseQuery()
    .createQueryBuilder('dish')
    .innerJoinAndSelect('dish.cuisines','cuisines')
    .getMany()
    
);
export const insertDishes = (ListOfDishes:Array<Dish>) => (
    dishBaseQuery()
    .insert(ListOfDishes)
);