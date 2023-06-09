import axios from 'axios'
import { UserFavorite as UserFavoriteType } from '../models/UserFavorite'

export default class UserFavoriteServer {
    static getMeals(userId: number) {
        return axios.get("/userFavorite/" + userId)
            .then(response => response)
            .catch(err => err.message)
    }

    static createUserFavorite(newUserFavorite: UserFavoriteType) {
        return axios.post("/userFavorite", { newUserFavorite })
            .then(response => response)
            .catch(err => err.message)
    }

    static deleteUserFavorite(userId: number, mealId: number) {
        return axios.delete("/userFavorite", { data: { userId, mealId } })
            .then(response => response)
            .catch(err => err.message)
    }
}