import axiosInstance from './axiosInstance'
import { UserPreferences } from '../models/UserPreferences'

export default class UserPreferenceServer {
    static updateUserPreference(newUserPreference: UserPreferences) {
        return axiosInstance.post("/userPreference", { newUserPreference })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserPreference(userId: number) {
        return axiosInstance.get(`/userPreference/${userId}`)
            .then((response) => {
                console.log(response)
                return (response.data.userPreference)? response.data.userPreference:[]
            } )
            .catch(err => err.message)
    }
}