import { Meal, UserMeal, UserPreference } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
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
    .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
    .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')
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
    const mealCategories = (userPreferences && userPreferences.mealCategories)?.map(meal => meal.id)
    const dishCategories = (userPreferences && userPreferences.dishCategories)?.map(dish => dish.id)
    const cuisines = ( userPreferences && userPreferences.cuisines)?.map(cuisine => cuisine.id)

    let mealsBysearchQuery =  mealBaseQuery()
        .leftJoinAndSelect('meal.MealCategories', 'MealCategories')
        .leftJoinAndSelect('mainDish.DishCategories', 'DishCategoriesMain')
        .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
        .leftJoinAndSelect('sideDish.DishCategories', 'DishCategoriesSide')
        .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')
        .where('LOWER(mainDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.name) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })
        .orWhere('LOWER(sideDish.description) LIKE :description', { description:`%${description}%` })

        if(mealCategories.length){
            mealsBysearchQuery = mealsBysearchQuery
            .andWhere('MealCategories.id IN (:...MealCategoriesIds)', { MealCategoriesIds: mealCategories })   
        }

        const result = await mealsBysearchQuery
        .orderBy('meal.rating', 'DESC')
        .getMany();


    return mealPrioritize(result,dishCategories,cuisines);
}


const userMealsBase = () => (
    AppDataSource.getRepository(UserMeal)
    .createQueryBuilder("UserMeal")
    .leftJoin("UserMeal.user", "user")
    .leftJoinAndSelect("UserMeal.meal", "meal")
    
    .innerJoinAndSelect('meal.mainDish', 'mainDish')
    .innerJoinAndSelect('meal.sideDish', 'sideDish')
    .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
    .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')
)

const userMeals = (userId: number, description: string) => (
    AppDataSource.getRepository(UserMeal)
    .createQueryBuilder("UserMeal")
    .leftJoin("UserMeal.user", "user")
    .leftJoinAndSelect("UserMeal.meal", "meal")
    
    .innerJoinAndSelect('meal.mainDish', 'mainDish')
    .innerJoinAndSelect('meal.sideDish', 'sideDish')
    .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
    .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')
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
export const getUserMealById = (mealId: number,userId:number) => (
    userMealsBase()
    .andWhere("user.id = :userId",{userId})
    .andWhere("meal.id = :mealId",{mealId})
    .getOne()
);
export const updateUserMeal = (meal: UserMeal) => (
    AppDataSource.getRepository(UserMeal)
    .save(meal)
);
export const insertMeals = (meals: Array<Meal>) => (
    mealBase()
    .insert(meals)
);

export const createMeal = (meal: Meal) => (
    mealBase().save(meal)
)

