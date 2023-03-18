import axios from 'axios'

export default class UserServer {

    static addUser(newUser) {
        return axios.post("/user", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }
}