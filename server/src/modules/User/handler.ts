import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { User } from "../../entity/User"
import Service from "./service"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../auth/tokensFuncs"

export const createUser = async (req: Request, res: Response) => {
    try {
        const userExists = await AppDataSource.getRepository(User).findOne({ where: { mail: req.body.newUser.mail } })

        if (userExists !== null)
            return res.status(httpStatus.OK).send({ message: "User already exists" })

        const user = await Service.createUser(req.body.newUser)

        if (user) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
            })

            return res.status(httpStatus.OK).send({ token: accessToken, user: user })
        }

        return res.status(httpStatus.NOT_FOUND).json(user)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await AppDataSource.getRepository(User).findOne({ where: { mail: req.body.user.mail } })

        if (user == null)
            return res.status(httpStatus.OK).send({ message: "Wrong email or password" })

        const match = await bcrypt.compare(req.body.user.password, user.password)

        if (!match)
            return res.status(httpStatus.OK).send({ message: "Wrong email or password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        })

        res.send({ token: accessToken })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}