import { Router, Request, Response } from "express"
import https from 'https';
import { Cuisine, Dish, Meal } from "../entities";
import { getAllCuisine,insertCuisines } from "../bl/cuisine-bl";
import { getAllDish,insertDishes } from "../bl/dish-bl";
import {getAllMeals, insertMeals} from "../bl/meal-bl";
import fs from "fs";
import path from "path";
const router = Router()
router.get('/cuisine/insert/:letter', async (req: Request, res: Response) => {
    const {letter} = req.params
    let data = '';
    let ListOfExistCuisines:Array<Cuisine> = [];
    ListOfExistCuisines = await getAllCuisine();
    const request = https.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,(response) =>
    {
        response.setEncoding('utf8');
        // As data starts streaming in, add each chunk to "data"
        response.on('data', (chunk) => { data += chunk; });
        // The whole response has been received. Print out the result.
        response.on('end', () => 
        {
          let mealsJson = JSON.parse(data);
          let mealListByLetter = mealsJson.meals;
          let ListOfCuisines:Array<Cuisine> = [];
          if(mealListByLetter)
            {
                mealListByLetter.forEach((meal:any) =>
                {
                    if(ListOfExistCuisines.findIndex((cuis) => { return cuis.description.toLowerCase() == meal.strArea.toLowerCase() }) < 0 &&
                       ListOfCuisines.findIndex((cuisNew) => { return cuisNew.description.toLowerCase() == meal.strArea.toLowerCase() }) < 0)
                   
                    {   
                        let newCuisine:Cuisine = new Cuisine();
                        newCuisine.description = meal.strArea;
                        ListOfCuisines.push(newCuisine);
                    }
                })
                // console.log(ListOfCuisines)
                ListOfCuisines = ListOfCuisines.filter((item,index) =>ListOfCuisines.indexOf(item) === index)
                console.log(ListOfCuisines)
                insertCuisines(ListOfCuisines);
            }
        });
    
    })
    return res.send("Data Has Been Submited");
});
router.get('/dishes/insert/:letter', async (req: Request, res: Response) => {
    const {letter} = req.params
    let data = '';
    let ListOfExistCuisines:Array<Cuisine> = [];
    let ListOfExistDishes:Array<Dish> = [];
    ListOfExistCuisines = await getAllCuisine();
    ListOfExistDishes = await getAllDish();
    const request = https.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,(response) =>
    {
        response.setEncoding('utf8');
        // As data starts streaming in, add each chunk to "data"
        response.on('data', (chunk) => { data += chunk; });
        // The whole response has been received. Print out the result.
        response.on('end', () => 
        {
          let mealsJson = JSON.parse(data);
          let mealListByLetter = mealsJson.meals;
          let ListOfDishes:Array<Dish> = [];
          if(mealListByLetter)
            {
                mealListByLetter.forEach((meal:any) =>
                {
                    if(ListOfExistDishes.findIndex((dish) => { return dish.name.toLowerCase() == meal.strMeal.toLowerCase() }) < 0 &&
                    ListOfDishes.findIndex((dishNew) => { return dishNew.name.toLowerCase() == meal.strMeal.toLowerCase() }) < 0)
                   {   
                        
                        let newDish:Dish = new Dish();
                        newDish.name = meal.strMeal;
                        newDish.description = meal.strMeal;
                        newDish.photo = '/' + meal.strMeal.split(" ").join('-');
                        let pathImage = path.join(__dirname,'..','..','..','client','public')
                        const file = fs.createWriteStream(pathImage + '/' + newDish.photo + ".jpg");
                        https.get(meal.strMealThumb, responseImage =>{
                            responseImage.pipe(file)
                            file.on('finish',() =>{
                                file.close();
                            })
                        });
                        newDish.cuisines = ListOfExistCuisines.find((cuisine) =>{ return cuisine.description.toLowerCase() == meal.strArea.toLowerCase()})
                        // newCuisine.description = meal.strArea;
                        ListOfDishes.push(newDish);
                    }
                })
                // console.log(ListOfCuisines)
                console.log(ListOfDishes)
                insertDishes(ListOfDishes);
            }
        });
    
    })
    return res.send("Data Has Been Submited");
});

router.get('/meals/insert/:side', async (req: Request, res: Response) => {
    const {side} = req.params
    const sideOptions = ["side","Deserts","Starters"];
    if(sideOptions.indexOf(side) < 0){
        res.send("Insert Side Category");
        return;
    }
    let data = '';
    let ListOfExistCuisines:Array<Cuisine> = [];
    let ListOfExistDishes:Array<Dish> = [];
    let ListOfExistMeals:Array<Meal> = [];
    ListOfExistMeals = await getAllMeals();
    ListOfExistCuisines = await getAllCuisine();
    ListOfExistDishes = await getAllDish();
    const request = https.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${side}`,(response) =>
    {
        response.setEncoding('utf8');
        // As data starts streaming in, add each chunk to "data"
        response.on('data', (chunk) => { data += chunk; });
        // The whole response has been received. Print out the result.
        response.on('end', () => 
        {
          let mealsJson = JSON.parse(data);
          let mealListByLetter = mealsJson.meals;
          let ListOfMeals:Array<Meal> = [];
          if(mealListByLetter)
            {
                mealListByLetter.forEach((meal:any) =>
                {
                    
                    let sideDish = ListOfExistDishes.find((EXdish) => { return EXdish.name.toLowerCase() == meal.strMeal.toLowerCase()});
                    let ListOfDishesCuisines = ListOfExistDishes.filter((dishesCuisines) =>{return dishesCuisines.cuisines.id == sideDish.cuisines.id})
                    ListOfDishesCuisines.forEach((mealComb) =>{

                    
                //     ListOfDishes.findIndex((dishNew) => { return dishNew.name.toLowerCase() == meal.strMeal.toLowerCase() }) < 0)
                //    {   
                        
                        let newMeal:Meal = new Meal();
                        newMeal.mainDish = mealComb;
                        newMeal.sideDish = sideDish;
                        newMeal.rating = 0;
                        // newDish.cuisines = ListOfExistCuisines.find((cuisine) =>{ return cuisine.description.toLowerCase() == meal.strArea.toLowerCase()})
                        // newCuisine.description = meal.strArea;
                        if(ListOfExistMeals.findIndex((mealIsComb) => { return mealIsComb.mainDish.id == newMeal.mainDish.id &&
                                                                               mealIsComb.sideDish.id == newMeal.sideDish.id }) < 0 &&
                            newMeal.mainDish.id != newMeal.sideDish.id &&
                            ListOfMeals.findIndex((mealIsNewComb) => { return mealIsNewComb.mainDish.id == newMeal.mainDish.id &&
                                mealIsNewComb.sideDish.id == newMeal.sideDish.id }) )
                        {
                            ListOfMeals.push(newMeal);
                        }
                })
                    // }
                })
                // console.log(ListOfCuisines)
                console.log(ListOfMeals)
                insertMeals(ListOfMeals);
            }
        });
    
    })
    return res.send("Data Has Been Submited");
});

export default router