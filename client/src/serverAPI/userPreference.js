import axios from 'axios'
// import url from 'url'
export default class UserPreferenceServer {
    static updateUserPreference(newUserPreference) {
        return axios.post("/userPreference", { newUserPreference })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserPreference() {
        return axios.get("/userPreference")
            .then(response => response.data.userPreference)
            .catch(err => err.message)
    }
}