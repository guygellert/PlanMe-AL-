import AppDataSource from '../../config/ormconfig';
import { Router } from "express";
import { getTopMeals, getMealById } from '../bl/meal-bl';

const mealRouter = Router();

mealRouter.get('/:id', async (req, resp) => {
    const { id } = req.params;
    const meal = await getMealById(parseInt(id));

    if(!meal){
        resp.status(404).json({message: 'Meal not found'});
    } else {
        resp.json({meal});
    }
})

mealRouter.get('/top', async (req, resp) => {
   const topMeals = await getTopMeals(15);
   resp.json({topMeals});
})


export default mealRouter;