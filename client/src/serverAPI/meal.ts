import axiosInstance from './axiosInstance'
import { Meal as MealType } from "../models/Meal-type"

export default class MealServer {
    static createMeal(newMeal: MealType) {
        return axiosInstance.post("/meal", { newMeal })
            .then(response => response)
            .catch(err => err.message)
    }

    static getMealBySearch(desc:string) {
        return axiosInstance.get("/meal/FilterByDesc/" + desc)
            .then(response => response.data)
            .catch(err => err.message)
    }
    static getTopMeal() {
        return axiosInstance.get("/meal/top")
            .then(response => response.data)
            .catch(err => err.message)
    }
    
    static updateMealRating(id:number) {
        return axiosInstance.put("/meal/updateRating/" + id)
            .then(response => response.data.meal)
            .catch(err => err.message)
    }
    static getRecepies(name:string){
        return axiosInstance.get("/meal/recepies/" + name)
        .then(response => response.data.meals)
        .catch(err => err.message)
    }
}