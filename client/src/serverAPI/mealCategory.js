import axios from 'axios'

export default class MealCategoryServer {
    static createMealCategory(newMealCategory) {
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