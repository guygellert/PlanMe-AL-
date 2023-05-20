import axios from 'axios'
import { User } from '../models/User'

export default class CuisineServer {
    static createCuisine(newUser: User) {
        return axios.post("/cuisine", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static getCuisines() {
        return axios.get("/cuisine")
            .then(response => response.data.cuisines)
            .catch(err => err.message)
    }
}