import AppDataSource from '../../config/ormconfig';
import { Router } from "express";
import { getTopMeals, getMealById, getMealBySearch, getMealsByUserPreference } from '../bl/meal-bl';

const mealRouter = Router();

mealRouter.get('/userPref', async (req, resp) => {
    const meals = await getMealsByUserPreference(2)
    resp.json({ meals });
})

mealRouter.get('/:id', async (req, resp) => {
    const { id } = req.params;
    const meal = await getMealById(parseInt(id));

    if (!meal) {
        resp.status(404).json({ message: 'Meal not found' });
    } else {
        resp.json({ meal });
    }
})

mealRouter.get('/:desc', async (req, resp) => {
    const { desc } = req.params;
    const meal = await getMealBySearch(desc);

    if (!meal) {
        resp.status(404).json({ message: 'Meal not found' });
    } else {
        resp.json({ meal });
    }
})

mealRouter.get('/top', async (req, resp) => {
    const topMeals = await getTopMeals(15);
    resp.json({ topMeals });
})

export default mealRouter;