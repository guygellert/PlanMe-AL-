import axiosInstance from "./axiosInstance"
import { DishCategory } from '../models/DishCategory'

export default class DishCategoryServer {
    static createDishCategory(newDishCategory: DishCategory) {
        return axiosInstance.post("/dishCategory", { newDishCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getDishCategory() {
        return axiosInstance.get("/dishCategory")
            .then(response => response.data.dishCategory)
            .catch(err => err.message)
    }
}