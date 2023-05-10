import AppDataSource from '../../config/ormconfig';
import { Router } from "express";
import nlp from "compromise"
import { getTopMeals, getMealById, getMealBySearch } from '../bl/meal-bl';
import MealService from "../modules/Meal/service";
const mealRouter = Router();

mealRouter.get('/', async (req, resp) => {
    const meal = await getTopMeals(100);

    if(!meal){
        resp.status(404).json({message: 'Meal not found'});
    } else {
        resp.json({meal});
    }
})

mealRouter.get('/filterById/:id', async (req, resp) => {
    const { id } = req.params;
    const meal = await getMealById(parseInt(id));

    if(!meal){
        resp.status(404).json({message: 'Meal not found'});
    } else {
        resp.json({meal});
    }
})


mealRouter.get('/FilterByDesc/:desc', async (req, resp) => {
    // console.log(req.params)
    const { desc } = req.params;
    let doc = nlp(desc);
    let input = doc.nouns().toSingular().out('text');
    console.log(input)
    let listOfPossible = input.split(" ");
    let listMatch:any[][] = [];
    let mealService:MealService = new MealService();
    let mealList =[];
    // const meal = await getMealBySearch(parseInt(id));
    listMatch = mealService.getPossibleOptions(listOfPossible);
    // console.log(listMatch);
    for(let i = 0; i < listMatch.length; i++){
        let description = listMatch[i].join(" ");
        console.log(description)
        if(description.length > 0){
        const meal = await getMealBySearch(description)
        mealList.push(meal);
        }
        
        console.log(mealList)
    }
})


mealRouter.get('/top', async (req, resp) => {
   const topMeals = await getTopMeals(15);
   resp.json({topMeals});
})


export default mealRouter;