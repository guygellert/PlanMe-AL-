import { Router } from "express";
import { getAllDish, getDishesByType } from "../bl/dish-bl"

const dishRouter = Router();

dishRouter.get('/', async (req, resp) => {
    const dishes = await getAllDish()

    if (!dishes) {
        resp.status(404).json({ message: 'Dishes not found' })
    } else {
        resp.json(dishes)
    }
})

dishRouter.get('/byType/:isMainDish', async (req, resp) => {
    const dishes = await getDishesByType(req.params.isMainDish === "true" ? true : false)

    if (!dishes) {
        resp.status(404).json({ message: 'Dishes not found' })
    } else {
        resp.json(dishes)
    }
})

export default dishRouter