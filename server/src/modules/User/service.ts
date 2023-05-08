import AppDataSource from "../../../config/ormconfig"
import bcrypt from "bcrypt"
import { User } from "../../entities/User"

export interface UserInput {
    firstName: string,
    lastName: string,
    mail: string,
    password: string
}

export default class Service {
    static createUser = async (user: UserInput) => {
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(user.password, salt)

        const newUser = new User()

        Object.assign(newUser, user)
        newUser.password = hashPwd

        return AppDataSource.getRepository(User).save(newUser)
    }
}