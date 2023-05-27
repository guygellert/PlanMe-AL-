import axios from 'axios'

export default class DishServer {
    static getDishes() {
        return axios.get("/dish")
            .then(response => response)
            .catch(err => err.message)
    }

    static getDishesByType(isMainDish: boolean) {
        return axios.get("/dish/byType/" + isMainDish)
            .then(response => response)
            .catch(err => err.message)
    }
}