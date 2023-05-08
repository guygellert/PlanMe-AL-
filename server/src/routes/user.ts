import { Router, Request, Response } from "express"
import { createUser } from "../modules/User/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return createUser(req, res)
})



export default router