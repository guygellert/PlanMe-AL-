import { Router, Request, Response } from "express"
import https from 'https';
import { Cuisine } from "../entities";
import { getAllCuisine,insertCuisines } from "../bl/cuisine-bl";
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
export default router