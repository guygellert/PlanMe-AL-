import axios from 'axios'
import { DishCategory } from '../models/DishCategory'

export default class MealServer {
    static createMeal(newDishCategory: DishCategory) {
        return axios.post("/meal", { newDishCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getMealBySearch(desc:string) {
        return axios.get("/meal/FilterByDesc/" + desc)
            .then(response => response.data.dishCategory)
            .catch(err => err.message)
    }
    static getTopMeal() {
        return axios.get("/meal/top")
            .then(response => response.data)
            .catch(err => err.message)
    }
    
    static updateMealRating(id:number) {
        return axios.put("/meal/updateRating/" + id)
            .then(response => response.data.meal)
            .catch(err => err.message)
    }
}