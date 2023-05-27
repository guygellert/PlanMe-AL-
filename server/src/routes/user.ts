import { Router, Request, Response } from "express"
import { createUser, getUserById } from "../modules/User/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return createUser(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
    return getUserById(req, res)
})


export default router