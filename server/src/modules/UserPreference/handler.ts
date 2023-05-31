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
import { UserPreference } from "../../entities/UserPreference"
import { getUserPreferenceById, updateNewUserPreference} from "../../bl/user-preference-bl";
export const updateUserPreference = async (req: Request, res: Response) => {
    try {
        // let stuff = jwt.decode(req.body.newUserPreference.User.token)
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: req.user.id} })
        let newUserPreferenceReq = req.body.newUserPreference;
        newUserPreferenceReq.User = user;
        const userPreference = await updateNewUserPreference(newUserPreferenceReq);
        // await Service.updateUserPreference(newUserPreferenceReq)

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
        // console.log(req.params.userId);
        const userPreference = await getUserPreferenceById(11);
        console.log(userPreference)
        if(userPreference)
        {
            return res.status(httpStatus.OK).send({ userPreference: userPreference });
        }
        return res.status(httpStatus.NOT_FOUND).send({ userPreference: userPreference });
            
        } catch (err) {
            console.log(err)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
     
}