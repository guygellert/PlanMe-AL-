import AppDataSource from "../../config/ormconfig"
import { Meal, User, UserMeal } from "../../src/entities";

interface UserMealInput {
    id?: number;
    userId: number;
    mealId: number;
    rating?: number;
}

export const getUserMeal = (userId: number, mealId: number) => (
    AppDataSource.getRepository(UserMeal).findOne({
        where: { user: { id: userId }, meal: { id: mealId } },
    })
)

export const createUserMeal = async (userMeal: UserMealInput) => {
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userMeal.userId } })
    const meal = await AppDataSource.getRepository(Meal).findOne({ where: { id: userMeal.mealId } })

    const newUserMeal = new UserMeal()
    Object.assign(newUserMeal, userMeal)

    newUserMeal.user = user
    newUserMeal.meal = meal

    return AppDataSource.getRepository(UserMeal).save(newUserMeal)
}