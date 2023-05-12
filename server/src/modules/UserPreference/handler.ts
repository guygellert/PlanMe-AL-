import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { Cuisine } from "../../entities/Cuisine"
import { DishCategory } from "../../entities/DishCategory"
import { MealCategory } from "../../entities/MealCategory"
import jwt, { verify } from "jsonwebtoken"
import { User } from "../../entities/User"
import Service from "./service"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../auth/tokensFuncs"
import { UserPreference } from "../../entities/UserPreference"

export const updateUserPreference = async (req: Request, res: Response) => {
    try {
        // let stuff = jwt.decode(req.body.newUserPreference.User.token)
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: req.user.id} })
        let newUserPreferenceReq = req.body.newUserPreference;
        newUserPreferenceReq.id = user.id;
        const userPreference = await Service.updateUserPreference(newUserPreferenceReq)

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
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: req.user.id} });
        let userId = user.id ;

        const userPreference = await AppDataSource.getRepository(UserPreference).createQueryBuilder("userPreference")
        .leftJoinAndSelect("userPreference.cuisines", "cuisine")
        .leftJoinAndSelect("userPreference.dishCategories", "dishCategories")
        .leftJoinAndSelect("userPreference.mealCategories", "mealCategories")
        .where("userPreference.id = :userId",{ userId })
        .getOne()
        
        // ({ where: { id: req.body.user.id } })
            return res.status(httpStatus.OK).send({ userPreference: userPreference });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
     
}