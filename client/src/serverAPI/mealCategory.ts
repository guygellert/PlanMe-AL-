import axios from 'axios'
import { MealCategory } from '../models/MealCategory'


export default class MealCategoryServer {
    static createMealCategory(newMealCategory: MealCategory) {
        return axios.post("/mealCategory", { newMealCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getMealCategory() {
        return axios.get("/mealCategory")
            .then(response => response.data.mealCategory)
            .catch(err => err.message)
    }
}