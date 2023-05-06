import { Router, Request, Response } from "express"
import { createMealCategory, getAllMealCategory } from "../modules/MealCategory/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return createMealCategory(req, res)
})
router.get('/', async (req: Request, res: Response) => {
    return getAllMealCategory(req, res)
})

export default router