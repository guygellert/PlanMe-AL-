import { Router } from "express";
import { createUserFavorite, deleteUserFavorites, getUserFavorites } from "../bl/user-favorite-bl";
import { createUserMeal, getUserMeal } from "../bl/user-meal-bl";

const userFavoriteRouter = Router();

userFavoriteRouter.get('/:userId', async (req, resp) => {
    const meals = await getUserFavorites(Number(req.params.userId))

    if (!meals) {
        resp.status(404).json({ message: 'Meals not found' })
    } else {
        resp.json(meals)
    }
})

userFavoriteRouter.post('/', async (req, resp) => {
    const userFavorite = await createUserFavorite(req.body.newUserFavorite)

    if (!userFavorite) {
        resp.status(404).json({ message: 'Create user favorite meal failed' })
    } else {
        let newUserMeal
        const userMeal = await getUserMeal(userFavorite.user.id, userFavorite.meal.id)

        if (userMeal) {
            newUserMeal = { id: userMeal.id, userId: userFavorite.user.id, mealId: userFavorite.meal.id, rating: userMeal.rating + 1 }
        } else {
            newUserMeal = { userId: userFavorite.user.id, mealId: userFavorite.meal.id, rating: 1 }
        }

        createUserMeal(newUserMeal)

        resp.json(userFavorite)
    }
})

userFavoriteRouter.delete('/', async (req, resp) => {
    const deleted = await deleteUserFavorites(Number(req.body.userId), Number(req.body.mealId))

    if (!deleted) {
        resp.status(404).json({ message: 'Delete user favorite meal failed' })
    } else {
        const userMeal = await getUserMeal(Number(req.body.userId), Number(req.body.mealId))

        if (userMeal) {
            if (userMeal.rating > 0)
                createUserMeal({
                    id: userMeal.id,
                    userId: Number(req.body.userId),
                    mealId: Number(req.body.mealId),
                    rating: userMeal.rating - 1
                })
        }

        resp.json(deleted)
    }
})

export default userFavoriteRouter