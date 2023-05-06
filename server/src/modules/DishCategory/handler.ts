import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { DishCategory } from "../../entity/DishCategory"
import Service from "./service"
export const createDishCategory = async (req: Request, res: Response) => {
    try {
        const dishCategoryExists = await AppDataSource.getRepository(DishCategory).findOne({ where: { description: req.body.description } })

        if (dishCategoryExists !== null)
            return res.status(httpStatus.OK).send({ message: "Meal Category already exists" })

        const dishCategory = await Service.createDishCategory(req.body.description);

        if (dishCategory) {

            return res.status(httpStatus.OK).send({ DishCategory: DishCategory })
        }

        return res.status(httpStatus.NOT_FOUND).json(DishCategory)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getAllDishCategory = async (req: Request, res: Response) => {
    try {
        const dishCategory = await AppDataSource.getRepository(DishCategory).find();
        return res.status(httpStatus.OK).send({ dishCategory: dishCategory });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}