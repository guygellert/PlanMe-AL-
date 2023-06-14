import axios from 'axios'
import { UserPreferences } from '../models/UserPreferences'
// import url from 'url'
export default class UserPreferenceServer {
    static updateUserPreference(newUserPreference: UserPreferences) {
        return axios.post("/userPreference", { newUserPreference })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserPreference(userId: number) {
        return axios.get(`/userPreference/${userId}`)
            .then(response => response.data.userPreference)
            .catch(err => err.message)
    }
}