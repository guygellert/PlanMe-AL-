import axios from 'axios'

export default class UserPreferenceServer {
    static updateUserPreference(newUserPreference) {
        return axios.post("/userPreference", { newUserPreference })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserPreference(user) {
        return axios.get("/userPreference", { user })
            .then(response => response)
            .catch(err => err.message)
    }
}