import { Router, Request, Response } from "express"
import { createDishCategory, getAllDishCategory } from "../modules/DishCategory/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return createDishCategory(req, res)
})
router.get('/', async (req: Request, res: Response) => {
    return getAllDishCategory(req, res)
})

export default router