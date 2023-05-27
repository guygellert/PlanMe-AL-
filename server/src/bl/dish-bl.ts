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

export const getDishesByType = (isMainDish: boolean) => (
    AppDataSource.getRepository(Dish).find({
        where: {isMain: isMainDish}
    }) 
)

export const insertDishes = (ListOfDishes:Array<Dish>) => (
    dishBaseQuery()
    .insert(ListOfDishes)
);
export const updateDishes = (Dish:Dish,id:number) => (
    dishBaseQuery()
    .createQueryBuilder("dish")
    .andWhere({id})
    .update(Dish)
    .execute()
);