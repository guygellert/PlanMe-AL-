import axios from 'axios'

export default class DishCategoryServer {
    static createDishCategory(newDishCategory) {
        return axios.post("/dishCategory", { newDishCategory })
            .then(response => response)
            .catch(err => err.message)
    }

    static getDishCategory() {
        return axios.get("/dishCategory")
            .then(response => response.data.dishCategory)
            .catch(err => err.message)
    }
}