import { Meal } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
import nlp from "compromise"

const mealBaseQuery = () => (
    AppDataSource.getRepository(Meal)
    .createQueryBuilder('meal')
    .innerJoinAndSelect('meal.mainDish','mainDish')
    .innerJoinAndSelect('meal.sideDish','sideDish')
);


export const getTopMeals = (maxRows: number) => (
    mealBaseQuery()
    .orderBy('meal.rating')
    .take(maxRows)
    .getMany()
);

export const getMealById = (id: number) => (
    mealBaseQuery()
    .andWhere({id})
    .getOne()
);
export const getMealBySearch = (description: string) => (
    mealBaseQuery()
    .orWhere('mainDish.description = :description',{description})
    // .orWhere('sideDish.description = :description',{description})
    .getMany()
);