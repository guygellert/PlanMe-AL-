import axios from 'axios'

export default class UserServer {

    static getData() {
        return axios.get("/user")
            .then(response => response)
            .catch(err => err.message)
    }

    static addUser(newUser) {
        return axios.post("/user", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static checkUser(user) {
        return axios.post("/login", { user })
            .then(response => response)
            .catch(err => err.message)
    }
}