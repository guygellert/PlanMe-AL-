import AppDataSource from "../../config/ormconfig"
import { Meal, User, UserFavorite } from "../../src/entities";

interface UserFavoriteInput {
    userId: number;
    mealId: number;
}

export const getUserFavorites = (userId: number) => (
    AppDataSource.getRepository(UserFavorite).find({
        where: { user: { id: userId } },
        relations: ["meal", "meal.mainDish", "meal.sideDish"]
    })
)

export const createUserFavorite = async (userFavoriteMeal: UserFavoriteInput) => {
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userFavoriteMeal.userId } })
    const meal = await AppDataSource.getRepository(Meal).findOne({ where: { id: userFavoriteMeal.mealId } })

    const newUserFavorite = new UserFavorite()
    newUserFavorite.user = user
    newUserFavorite.meal = meal

    return AppDataSource.getRepository(UserFavorite).save(newUserFavorite)
}

export const deleteUserFavorites = (userId: number, mealId: number) => (
    AppDataSource.getRepository(UserFavorite).delete({ user: { id: userId }, meal: { id: mealId } })
)