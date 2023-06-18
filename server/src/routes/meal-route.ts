import AppDataSource from '../../config/ormconfig';
import { Router } from "express";
import nlp from "compromise"
import { getTopMeals, getMealById, getMealBySearch, updateMeal, createMeal,getUserMealById, updateUserMeal} from '../bl/meal-bl';
import MealService from "../modules/Meal/service";
import { Meal } from '../entities/Meal';
import {User} from "../entities/User";
import { UserMeal } from '../entities';
import https from 'https';
const mealRouter = Router();

mealRouter.get('/', async (req, resp) => {
    const meal = await getTopMeals(2000);

    if (!meal) {
        resp.status(404).json({ message: 'Meal not found' });
    } else {
        resp.json({ meal });
    }
})

mealRouter.get('/filterById/:id', async (req, resp) => {
    const { id } = req.params;
    const meal = await getMealById(parseInt(id));

    if (!meal) {
        resp.status(404).json({ message: 'Meal not found' });
    } else {
        resp.json({ meal });
    }
})

mealRouter.put('/updateRating/:id', async (req, resp) => {
    const { id } = req.params;
    const meal = await getMealById(parseInt(id));
    let userMeal:UserMeal = await getUserMealById(parseInt(id),req.user.id);
    if (!meal) {
        resp.status(404).json({ message: 'Meal not found' });
    } else {
        meal.rating = meal.rating + 1;
        await updateMeal(meal, meal.id);
        if(!userMeal){
            userMeal = new UserMeal();
            userMeal.meal = meal;            
            userMeal.user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.user.id) });
            userMeal.rating = 0;
        }
        userMeal.rating++;
        await updateUserMeal(userMeal);
        resp.json({ meal });
    }
})

mealRouter.get('/FilterByDesc/:desc', async (req, resp) => {
    const { desc } = req.params;
    let doc = nlp(desc);
    let input = doc.nouns().toSingular().out('text');
    let inputPronuns = doc.pronouns().out('text');

    let listOfPossible: Array<String> = input.split(" ");
    let listOfPronouns: Array<String> = inputPronuns.split(" ")
    listOfPossible = listOfPossible.filter((el: String) => !listOfPronouns.includes(el));
    let listMatch: any[][] = [];
    let mealService: MealService = new MealService();
    let mealList: Meal[] = [];
    // const meal = await getMealBySearch(parseInt(id));
    listMatch = mealService.getPossibleOptions(listOfPossible);
    for (let i = 0; i < listMatch.length; i++) {
        let description = listMatch[i].join(" ");
        if (description.length > 0) {
            const meal = await getMealBySearch(req.user.id, description)
            mealList = mealList.concat(meal);
            console.log(mealList)
        }
    }
    resp.json(mealList);
})

mealRouter.get('/top', async (req, resp) => {
    const topMeals = await getTopMeals(2000);
    resp.json(topMeals);
})
mealRouter.get('/recepies/:name', async (req, res) => {
    const { name } = req.params;
    let data = '';
    const request = https.get(encodeURI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`),(response) =>
    {
        response.setEncoding('utf8');
        // As data starts streaming in, add each chunk to "data"
        response.on('data', (chunk) => { data += chunk; });
        // The whole response has been received. Print out the result.
        response.on('end', () => 
        {
            return res.send(data);
        })
    })
})

mealRouter.post('/', async (req, resp) => {
    const isExist = await AppDataSource.getRepository(Meal).findOne({
        where: { mainDish: req.body.newMeal.mainDish, sideDish: req.body.newMeal.sideDish }
    })

    if (!isExist) {
        const newMeal = await createMeal(req.body.newMeal)

        if (!newMeal) {
            resp.status(404).json({ message: 'Create meal failed' })
        } else {
            resp.json(newMeal)
        }
    } else {
        resp.status(400).json({ message: 'Meal already exists' })
    }
})

export default mealRouter;