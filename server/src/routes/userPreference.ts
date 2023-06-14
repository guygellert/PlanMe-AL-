import { Router, Request, Response } from "express"
import { updateUserPreference,getUserPreference } from "../modules/UserPreference/handler"
const router = Router()

router.post('/', async (req: Request, res: Response) => {
    return updateUserPreference(req, res)
})
router.get('/:id', async (req: Request, res: Response) => {
    return getUserPreference(req, res)
})




export default router