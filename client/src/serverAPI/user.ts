import axios from 'axios'
import { User } from '../models/User'

export default class UserServer {
    static addUser(newUser: User) {
        return axios.post("/register", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static login(mail:string, password: string ) {
        return axios.post("/login", { mail, password })
            .then(response => response)
            .catch(err => err.message)
    }
}