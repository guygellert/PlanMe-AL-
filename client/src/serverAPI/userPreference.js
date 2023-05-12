import axios from 'axios'
// import url from 'url'
export default class UserPreferenceServer {
    static updateUserPreference(newUserPreference) {
        return axios.post("/userPreference", { newUserPreference })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserPreference(UserPreference) {
        const queryParams = {user: UserPreference.User.email};
        const params = new URLSearchParams(queryParams)
        return axios.get("/userPreference", { params: params})
            .then(response => response.data.userPreference)
            .catch(err => err.message)
    }
}