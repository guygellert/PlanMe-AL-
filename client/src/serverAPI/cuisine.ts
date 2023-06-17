import axiosInstance from "./axiosInstance"
import { User } from '../models/User'

export default class CuisineServer {
    static createCuisine(newUser: User) {
        return axiosInstance.post("/cuisine", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static getCuisines() {
        return axiosInstance.get("/cuisine")
            .then(response => response.data.cuisines)
            .catch(err => err.message)
    }
}