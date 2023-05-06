import AppDataSource from "../../../config/ormconfig"
import { Request, Response } from "express"
import httpStatus from "http-status"
import { Cuisine } from "../../entities/Cuisine"
import Service from "./service"
export const createCuisine = async (req: Request, res: Response) => {
    try {
        const cuisineExists = await AppDataSource.getRepository(Cuisine).findOne({ where: { description: req.body.description } })

        if (cuisineExists !== null)
            return res.status(httpStatus.OK).send({ message: "Cuisine already exists" })

        const cuisine = await Service.createCuisine(req.body.description);

        if (cuisine) {

            return res.status(httpStatus.OK).send({ cuisine: cuisine })
        }

        return res.status(httpStatus.NOT_FOUND).json(cuisine)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getAllCuisine = async (req: Request, res: Response) => {
    try {
        const cuisines = await AppDataSource.getRepository(Cuisine).find();
        console.log(cuisines);
        return res.status(httpStatus.OK).send({ cuisines: cuisines });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}