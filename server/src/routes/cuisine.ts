import { Router, Request, Response } from "express"
import { createCuisine, getAllCuisine } from "../modules/Cuisine/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return createCuisine(req, res)
})
router.get('/', async (req: Request, res: Response) => {
    return getAllCuisine(req, res)
})

export default router