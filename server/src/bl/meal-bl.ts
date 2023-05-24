import { Cuisine, DishCategory, Meal, UserMeal, UserPreference } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
import nlp from "compromise"
import { Brackets } from "typeorm";

const mealBase = () => (
    AppDataSource.getRepository(Meal)
);
const mealBaseQuery = () => (
    AppDataSource.getRepository(Meal)
        .createQueryBuilder('meal')
        .innerJoinAndSelect('meal.mainDish', 'mainDish')
        .innerJoinAndSelect('meal.sideDish', 'sideDish')
);

export const getTopMeals = (maxRows: number) => (
    mealBaseQuery()
        .orderBy('meal.rating', 'DESC')
        .take(maxRows)
        .getMany()
);

export const getAllMeals = () => (
    mealBaseQuery()
    .getMany()
);

export const getMealById = (id: number) => (
    mealBaseQuery()
        .andWhere({ id })
        .getOne()
)

export const getMealBySearch = async (userId: number, description: string) => {
    const globalMeals = await getMealsByUserPreference(userId, description)
    const mealsUser = await userMeals(userId, description)

    return globalMeals;
};

const userPreference = (userId: number) => (
    AppDataSource.getRepository(UserPreference)
        .createQueryBuilder("userPreference")
        .leftJoinAndSelect("userPreference.mealCategories", "mealCategories")
        .leftJoinAndSelect("userPreference.dishCategories", "dishCategories")
        .leftJoinAndSelect("userPreference.cuisines", "cuisines")
        .where("userPreference.user.id = :userId", { userId })
        .getOne()
)

const mealPrioritize = (meals: Meal[], prefDishCategory: number[], prefCuisines: number[]) => {
    const mealsWithPriority = meals.map((meal, index) =>{
        let priority = meal.rating > 0 ? 3*(meals.length - index) : 0;
        if(meal.mainDish.cuisines && prefCuisines.includes(meal.mainDish.cuisines.id) ){
            priority += 1;
        }

        if(meal.sideDish.cuisines && prefCuisines.includes(meal.mainDish.cuisines.id) ){
            priority += 1;
        }

        meal.mainDish.DishCategories.forEach(category => {
            if(prefDishCategory.includes(category.id)){
                priority += 1;
            }
        });

        meal.sideDish.DishCategories.forEach(category => {
            if(prefDishCategory.includes(category.id)){
                priority += 1;
            }
        });

        return ({...meal, priorityRate: priority })})
    
    return mealsWithPriority.sort((a,b) => b.priorityRate - a.priorityRate);
}

const getMealsByUserPreference = async (userId: number, description: string) => {
    const userPreferences = await userPreference(userId)
    const mealCategories = userPreferences.mealCategories?.map(meal => meal.id)
    const dishCategories = userPreferences.dishCategories?.map(dish => dish.id)
    const cuisines = userPreferences.cuisines?.map(cuisine => cuisine.id)

    const mealsBysearch = await mealBaseQuery()
        .leftJoinAndSelect('meal.MealCategories', 'MealCategories')
        .leftJoinAndSelect('mainDish.DishCategories', 'DishCategoriesMain')
        .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
        .leftJoinAndSelect('sideDish.DishCategories', 'DishCategoriesSide')
        .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')
        .where('LOWER(mainDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })
        // .andWhere('MealCategories.id IN (:...MealCategoriesIds)', { MealCategoriesIds: mealCategories })
        .orderBy('meal.rating', 'DESC')
        .getMany();


    return mealPrioritize(mealsBysearch,dishCategories,cuisines);
}

const userMeals = (userId: number, description: string) => (
    AppDataSource.getRepository(UserMeal)
    .createQueryBuilder("UserMeal")
    .leftJoin("UserMeal.user", "user")
    .leftJoinAndSelect("UserMeal.meal", "meal")
    .innerJoinAndSelect('meal.mainDish', 'mainDish')
    .innerJoinAndSelect('meal.sideDish', 'sideDish')
    .where("user.id = :userId", { userId })
    .andWhere(new Brackets(qb => {
        qb.where('LOWER(mainDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })
    })).getMany())

export const updateMeal = (meal: Meal,id:number) => (
    mealBaseQuery()
    .andWhere({id})
    .update(meal)
    // .set({rating:meal.rating})
    .execute()
);
export const insertMeals = (meals: Array<Meal>) => (
    mealBase()
    .insert(meals)
);

