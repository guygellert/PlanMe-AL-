import axios from 'axios'

export default class MealServer {
    static createMeal(newDishCategory) {
        return axios.post("/meal", { newDishCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getMealBySearch(desc) {
        const queryParams = {desc: desc};
        const params = new URLSearchParams(queryParams)
        return axios.get("/meal/FilterByDesc/" + desc)
            .then(response => response.data.dishCategory)
            .catch(err => err.message)
    }
    static getTopMeal() {
        return axios.get("/meal/")
            .then(response => response.data.meal)
            .catch(err => err.message)
    }
    
}