import { Meal, UserMeal, UserPreference } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"

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

export const getMealById = (id: number) => (
    mealBaseQuery()
        .andWhere({ id })
        .getOne()
)

export const getMealBySearch = (description: String) => (
    mealBaseQuery()
        .andWhere({})
        .getOne()
)

const userPreference = (userId: number) => (
    AppDataSource.getRepository(UserPreference)
        .createQueryBuilder("userPreference")
        .leftJoinAndSelect("userPreference.mealCategories", "mealCategories")
        .leftJoinAndSelect("userPreference.dishCategories", "dishCategories")
        .leftJoinAndSelect("userPreference.cuisines", "cuisines")
        .where("userPreference.id = :userId", { userId })
        .getOne()
)

export const getMealsByUserPreference = async (userId: number) => {
    const userPreferences = await userPreference(userId)
    const mealCategories = userPreferences.mealCategories?.map(meal => meal.id)
    const dishCategories = userPreferences.dishCategories?.map(dish => dish.id)
    const cuisines = userPreferences.cuisines?.map(cuisine => cuisine.id)

    const query = mealBaseQuery()
        .leftJoinAndSelect('meal.MealCategories', 'MealCategories')
        .leftJoinAndSelect('mainDish.DishCategories', 'DishCategoriesMain')
        .leftJoinAndSelect('mainDish.cuisines', 'cuisinesMain')
        .leftJoinAndSelect('sideDish.DishCategories', 'DishCategoriesSide')
        .leftJoinAndSelect('sideDish.cuisines', 'cuisinesSide')

    if (mealCategories.length)
        query.where('MealCategories.id IN (:...MealCategoriesIds)', { MealCategoriesIds: mealCategories })

    if (dishCategories.length)
        query.andWhere('DishCategoriesMain.id IN (:...DishCategoriesMainIds)', { DishCategoriesMainIds: dishCategories })
            .orWhere('DishCategoriesSide.id IN (:...DishCategoriesSideIds)', { DishCategoriesSideIds: dishCategories })

    if (cuisines.length)
        query.andWhere('cuisinesMain.id IN (:...cuisinesMainIds)', { cuisinesMainIds: cuisines })
            .orWhere('cuisinesSide.id IN (:...cuisinesSideIds)', { cuisinesSideIds: cuisines })

    return query.orderBy('meal.rating', 'DESC').getMany()
}

const userMeals = (userId: number) => (
    AppDataSource.getRepository(UserMeal)
    .createQueryBuilder("UserMeal")
    .leftJoinAndSelect("UserMeal.meal", "meal")
    .leftJoin("UserMeal.user", "user")
    .where("user.id = :userId", { userId })
    .getMany()
)

