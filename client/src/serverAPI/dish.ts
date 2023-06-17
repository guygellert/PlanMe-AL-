import axiosInstance from "./axiosInstance"

export default class DishServer {
    static getDishes() {
        return axiosInstance.get("/dish")
            .then(response => response)
            .catch(err => err.message)
    }

    static getDishesByType(isMainDish: boolean) {
        return axiosInstance.get("/dish/byType/" + isMainDish)
            .then(response => response)
            .catch(err => err.message)
    }
}