import axiosInstance from './axiosInstance'
import { User } from '../models/User'

export default class UserServer {
    static addUser(newUser: User) {
        return axiosInstance.post("/register", { newUser })
            .then(response => response)
            .catch(err => err.message)
    }

    static getUserById(id:number) {
        return axiosInstance.get(`/user/${id}`)
            .then(response => response.data.user)
            .catch(err => err.message)
    }

    static login(mail:string, password: string ) {
        return axiosInstance.post("/login", { mail, password })
            .then(response => response)
            .catch(err => err.message)
    }
}