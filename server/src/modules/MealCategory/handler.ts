import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { MealCategory } from "../../entity/MealCategory"
import Service from "./service"
export const createMealCategory = async (req: Request, res: Response) => {
    try {
        const mealCategoryExists = await AppDataSource.getRepository(MealCategory).findOne({ where: { description: req.body.description } })

        if (mealCategoryExists !== null)
            return res.status(httpStatus.OK).send({ message: "Meal Category already exists" })

        const mealCategory = await Service.createMealCategory(req.body.description);

        if (mealCategory) {

            return res.status(httpStatus.OK).send({ MealCategory: MealCategory })
        }

        return res.status(httpStatus.NOT_FOUND).json(MealCategory)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getAllMealCategory = async (req: Request, res: Response) => {
    try {
        const mealCategory = await AppDataSource.getRepository(MealCategory).find();
        return res.status(httpStatus.OK).send({ mealCategory: mealCategory });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}