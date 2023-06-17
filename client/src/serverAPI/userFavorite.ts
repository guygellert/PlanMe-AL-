import axiosInstance from './axiosInstance'
import { UserFavorite as UserFavoriteType } from '../models/UserFavorite'

export default class UserFavoriteServer {
    static getMeals(userId: number) {
        return axiosInstance.get("/userFavorite/" + userId)
            .then(response => response)
            .catch(err => err.message)
    }

    static createUserFavorite(newUserFavorite: UserFavoriteType) {
        return axiosInstance.post("/userFavorite", { newUserFavorite })
            .then(response => response)
            .catch(err => err.message)
    }

    static deleteUserFavorite(userId: number, mealId: number) {
        return axiosInstance.delete("/userFavorite", { data: { userId, mealId } })
            .then(response => response)
            .catch(err => err.message)
    }
}