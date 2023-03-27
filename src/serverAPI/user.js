import axios from 'axios'

export default class UserServer {
    static addUser(newUser) {
        return axios.post("/register", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static login(user) {
        return axios.post("/login", { user })
            .then(response => response)
            .catch(err => err.message)
    }
}