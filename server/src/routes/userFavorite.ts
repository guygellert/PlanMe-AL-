import { Router } from "express";
import { createUserFavorite, deleteUserFavorites, getUserFavorites } from "../bl/user-favorite-bl";

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
        resp.json(userFavorite)
    }
})

userFavoriteRouter.delete('/', async (req, resp) => {
    const deleted = await deleteUserFavorites(Number(req.body.userId), Number(req.body.mealId))

    if (!deleted) {
        resp.status(404).json({ message: 'Delete user favorite meal failed' })
    } else {
        resp.json(deleted)
    }
})

export default userFavoriteRouter