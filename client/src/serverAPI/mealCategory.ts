import axiosInstance from './axiosInstance'
import { MealCategory } from '../models/MealCategory'


export default class MealCategoryServer {
    static createMealCategory(newMealCategory: MealCategory) {
        return axiosInstance.post("/mealCategory", { newMealCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getMealCategory() {
        return axiosInstance.get("/mealCategory")
            .then(response => response.data.mealCategory)
            .catch(err => err.message)
    }
}