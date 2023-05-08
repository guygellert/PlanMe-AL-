import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { Cuisine } from "../../entities/Cuisine"
import { DishCategory } from "../../entities/DishCategory"
import { MealCategory } from "../../entities/MealCategory"
import { User } from "../../entities/User"
import Service from "./service"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../auth/tokensFuncs"
import { UserPreference } from "../../entities/UserPreference"

export const updateUserPreference = async (req: Request, res: Response) => {
    try {
        const userPreference = await Service.updateUserPreference(req.body.newUserPreference)

        if (userPreference) {
            return res.status(httpStatus.OK).send({userPreference: userPreference })
        }
        return res.status(httpStatus.NOT_FOUND).json(userPreference)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getUserPreference = async (req: Request, res: Response) => {
    try {
        const userPreference = await AppDataSource.getRepository(UserPreference).createQueryBuilder("userPreference")
        .leftJoinAndSelect("userPreference.cuisines", "cuisine")
        .getMany()
        
        // ({ where: { id: req.body.user.id } })
            return res.status(httpStatus.OK).send({ userPreference: userPreference });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
     
}